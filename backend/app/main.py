# ============================================================
# main.py — Punto de entrada de la API de GUTZDEPT
# ============================================================
# Este archivo define todos los endpoints (rutas) de la API.
# FastAPI recibe las peticiones del frontend, las procesa
# y devuelve respuestas en formato JSON.
# ============================================================

import os
import stripe
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from app.database import engine, get_db, Base
from app.models import Product, Order, OrderItem
from app.schemas import ProductOut, OrderCreate, OrderOut

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Configurar la clave secreta de Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Crear las tablas en la base de datos si no existen
Base.metadata.create_all(bind=engine)
# ============================================================
# Precargar productos si la base de datos está vacía
# ============================================================
from app.seed import seed
seed()
# Crear la aplicación FastAPI con título y descripción
app = FastAPI(title="GUTZDEPT API", description="API del e-commerce GUTZDEPT")

# ============================================================
# Configuración de CORS
# ============================================================
# CORS (Cross-Origin Resource Sharing) permite que el frontend
# (localhost:3000) pueda hacer peticiones al backend (localhost:8000).
# Sin esto, el navegador bloquearía todas las peticiones por seguridad.
# ============================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# ENDPOINTS DE PRODUCTOS
# ============================================================

@app.get("/productos", response_model=list[ProductOut])
def get_products(category: str | None = None, search: str | None = None, db: Session = Depends(get_db)):
    """
    Devuelve la lista de productos.
    Parámetros opcionales:
    - category: filtra por categoría exacta
    - search: filtra por nombre (búsqueda parcial, case-insensitive)
    """
    query = db.query(Product)

    if category:
        query = query.filter(Product.category == category)

    if search:
        # ilike = like pero sin distinguir mayúsculas/minúsculas
        # %search% = que contenga el texto en cualquier posición
        query = query.filter(Product.name.ilike(f"%{search}%"))

    products = query.all()

    # Convertir el string de tallas ("S,M,L") a lista (["S","M","L"])
    # porque el frontend espera una lista, no un string
    result = []
    for p in products:
        product_dict = {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "image": p.image,
            "category": p.category,
            "sizes": p.sizes.split(","),
        }
        result.append(ProductOut(**product_dict))

    return result


@app.get("/productos/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    """Devuelve un producto concreto por su ID."""
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return ProductOut(
        id=product.id,
        name=product.name,
        price=product.price,
        image=product.image,
        category=product.category,
        sizes=product.sizes.split(","),
    )


# ============================================================
# ENDPOINTS DE STRIPE (PAGOS)
# ============================================================

@app.post("/crear-sesion-pago")
def create_checkout_session(order_data: OrderCreate, db: Session = Depends(get_db)):
    """
    Crea una sesión de pago en Stripe y devuelve la URL
    a la que hay que redirigir al usuario para que pague.

    Flujo:
    1. El frontend envía los datos del pedido
    2. Este endpoint guarda el pedido en la BD con estado "pending"
    3. Crea una sesión de Stripe Checkout con los productos
    4. Devuelve la URL de pago de Stripe al frontend
    5. El frontend redirige al usuario a esa URL
    """

    # --- Paso 1: Guardar el pedido en la BD con estado "pending" ---
    # Lo guardamos antes de pagar porque necesitamos el ID del pedido
    # para poder identificarlo cuando Stripe nos confirme el pago
    order = Order(
        customer_name=order_data.customer_name,
        customer_email=order_data.customer_email,
        customer_phone=order_data.customer_phone,
        address=order_data.address,
        city=order_data.city,
        postal_code=order_data.postal_code,
        country=order_data.country,
        total=order_data.total,
        status="pending",  # Pendiente hasta que Stripe confirme
    )
    db.add(order)
    db.flush()  # Obtener el ID sin confirmar definitivamente

    # Guardar las líneas del pedido
    for item in order_data.items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            size=item.size,
            quantity=item.quantity,
            price=item.price,
        )
        db.add(order_item)

    db.commit()
    db.refresh(order)

    # --- Paso 2: Crear los "line items" para Stripe ---
    # Stripe necesita saber qué productos se están comprando,
    # con su nombre, precio y cantidad
    line_items = []
    for item in order_data.items:
        line_items.append({
            "price_data": {
                "currency": "eur",
                "product_data": {
                    "name": f"{item.product_name} (Talla {item.size})",
                },
                # Stripe trabaja en céntimos: 35€ = 3500 céntimos
                "unit_amount": int(item.price * 100),
            },
            "quantity": item.quantity,
        })

    # --- Paso 3: Crear la sesión de Stripe Checkout ---
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            # A dónde redirigir si el pago es exitoso
            success_url="http://localhost:3000/checkout/exito?session_id={CHECKOUT_SESSION_ID}",
            # A dónde redirigir si el usuario cancela
            cancel_url="http://localhost:3000/checkout/error",
            # Guardamos el ID del pedido para identificarlo después
            metadata={"order_id": str(order.id)},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # --- Paso 4: Devolver la URL de pago al frontend ---
    return JSONResponse(content={"url": session.url})


@app.post("/webhook-stripe")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Webhook que Stripe llama automáticamente cuando un pago se completa.

    Flujo:
    1. Stripe envía una petición POST a esta URL
    2. Leemos el evento (tipo de evento + datos)
    3. Si es un pago completado, buscamos el pedido y lo marcamos como "confirmed"

    Importante: este endpoint NO lo llama el frontend.
    Lo llama directamente Stripe servidor-a-servidor.
    """
    # Leer el cuerpo de la petición
    payload = await request.body()

    try:
        # Construir el evento de Stripe
        event = stripe.Event.construct_from(
            stripe.util.json.loads(payload), stripe.api_key
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Evento inválido")

    # Si el evento es "pago completado"
    if event.type == "checkout.session.completed":
        session = event.data.object

        # Recuperar el ID del pedido que guardamos en metadata
        order_id = session.metadata.get("order_id")

        if order_id:
            # Buscar el pedido en la BD y marcarlo como confirmado
            order = db.query(Order).filter(Order.id == int(order_id)).first()
            if order:
                order.status = "confirmed"
                db.commit()

    return {"status": "ok"}


# ============================================================
# ENDPOINTS DE PEDIDOS
# ============================================================

@app.get("/pedidos/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    """Devuelve un pedido concreto por su ID."""
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    return order