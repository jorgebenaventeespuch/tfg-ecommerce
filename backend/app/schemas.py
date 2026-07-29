from pydantic import BaseModel


# --- Productos ---

class ProductOut(BaseModel):
    id: str
    name: str
    price: float
    image: str
    category: str
    sizes: list[str]

    class Config:
        from_attributes = True


# --- Pedidos ---

class OrderItemCreate(BaseModel):
    product_id: str
    product_name: str
    size: str
    quantity: int
    price: float


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: str
    address: str
    city: str
    postal_code: str
    country: str
    total: float
    items: list[OrderItemCreate]


class OrderItemOut(BaseModel):
    id: int
    product_id: str
    product_name: str
    size: str
    quantity: int
    price: float

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    id: int
    customer_name: str
    customer_email: str
    total: float
    status: str
    items: list[OrderItemOut]

    class Config:
        from_attributes = True
        