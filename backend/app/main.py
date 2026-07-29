from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base
from app.models import Product, Order, OrderItem
from app.schemas import ProductOut, OrderCreate, OrderOut

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(title="GUTZDEPT API", description="API del e-commerce GUTZDEPT")

# Configurar CORS para que el frontend pueda hacer peticiones al backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Endpoints de productos ---

@app.get("/productos", response_model=list[ProductOut])
def get_products(category: str | None = None, search: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Product)

    if category:
        query = query.filter(Product.category == category)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    products = query.all()

    # Convertir el string de tallas a lista para la respuesta
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


# --- Endpoints de pedidos ---

@app.post("/pedidos", response_model=OrderOut)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    # Crear el pedido
    order = Order(
        customer_name=order_data.customer_name,
        customer_email=order_data.customer_email,
        customer_phone=order_data.customer_phone,
        address=order_data.address,
        city=order_data.city,
        postal_code=order_data.postal_code,
        country=order_data.country,
        total=order_data.total,
    )
    db.add(order)
    db.flush()  # Para obtener el ID del pedido antes de crear los items

    # Crear las líneas del pedido
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

    return order


@app.get("/pedidos/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    return order