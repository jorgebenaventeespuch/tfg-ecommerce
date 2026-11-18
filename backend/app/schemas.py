from pydantic import BaseModel


class ProductOut(BaseModel):
    id: str
    name: str
    price: float
    image: str
    hover_image: str | None = None
    images: list[str] = []
    category: str
    sizes: list[str]
    description: str | None = None

    class Config:
        from_attributes = True


class OrderItemCreate(BaseModel):
    product_id: str
    size: str
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: str
    address: str
    city: str
    postal_code: str
    country: str
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