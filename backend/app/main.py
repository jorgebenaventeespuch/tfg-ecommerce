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

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

Base.metadata.create_all(bind=engine)

from app.seed import seed
seed()

app = FastAPI(title="GUTZDEPT API", description="API del e-commerce GUTZDEPT")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://tfg-ecommerce.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/productos", response_model=list[ProductOut])
def get_products(category: str | None = None, search: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Product)

    if category:
        query = query.filter(Product.category == category)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    products = query.all()

    result = []
    for p in products:
        product_dict = {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "image": p.image,
            "hover_image": p.hover_image,
            "images": p.images.split(",") if p.images else [],
            "category": p.category,
            "sizes": p.sizes.split(","),
            "description": p.description,
        }
        result.append(ProductOut(**product_dict))

    return result


@app.get("/productos/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return ProductOut(
        id=product.id,
        name=product.name,
        price=product.price,
        image=product.image,
        hover_image=product.hover_image,
        images=product.images.split(",") if product.images else [],
        category=product.category,
        sizes=product.sizes.split(","),
        description=product.description,
    )


@app.post("/crear-sesion-pago")
def create_checkout_session(order_data: OrderCreate, db: Session = Depends(get_db)):
    # Validar productos y obtener precios de la BBDD (nunca del frontend)
    order_items_data = []
    total = 0.0

    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Producto con id '{item.product_id}' no encontrado",
            )
        order_items_data.append({
            "product_id": product.id,
            "product_name": product.name,
            "size": item.size,
            "quantity": item.quantity,
            "price": product.price,
        })
        total += product.price * item.quantity

    # Crear el pedido con el total calculado por el backend
    order = Order(
        customer_name=order_data.customer_name,
        customer_email=order_data.customer_email,
        customer_phone=order_data.customer_phone,
        address=order_data.address,
        city=order_data.city,
        postal_code=order_data.postal_code,
        country=order_data.country,
        total=total,
        status="pending",
    )
    db.add(order)
    db.flush()

    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item_data["product_id"],
            product_name=item_data["product_name"],
            size=item_data["size"],
            quantity=item_data["quantity"],
            price=item_data["price"],
        )
        db.add(order_item)

    db.commit()
    db.refresh(order)

    # Crear line_items de Stripe con precios de la BBDD
    line_items = []
    for item_data in order_items_data:
        line_items.append({
            "price_data": {
                "currency": "eur",
                "product_data": {
                    "name": f"{item_data['product_name']} (Talla {item_data['size']})",
                },
                "unit_amount": int(item_data["price"] * 100),
            },
            "quantity": item_data["quantity"],
        })

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=os.getenv("FRONTEND_URL", "http://localhost:3000") + "/checkout/exito?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=os.getenv("FRONTEND_URL", "http://localhost:3000") + "/checkout/error",
            metadata={"order_id": str(order.id)},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return JSONResponse(content={"url": session.url})


@app.post("/webhook-stripe")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()

    try:
        event = stripe.Event.construct_from(
            stripe.util.json.loads(payload), stripe.api_key
        )
    except Exception:
        raise HTTPException(status_code=400, detail="Evento inválido")

    if event.type == "checkout.session.completed":
        session = event.data.object
        order_id = session.metadata.get("order_id")

        if order_id:
            order = db.query(Order).filter(Order.id == int(order_id)).first()
            if order:
                order.status = "confirmed"
                db.commit()

    return {"status": "ok"}


@app.get("/pedidos/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    return order