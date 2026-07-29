from app.database import engine, SessionLocal, Base
from app.models import Product

# Crear las tablas si no existen
Base.metadata.create_all(bind=engine)

# Datos ficticios (los mismos que tenías en el frontend)
products_data = [
    {
        "id": "1",
        "name": "Camiseta oversize negra",
        "price": 35,
        "image": "https://placehold.co/600x800/000000/FFFFFF?text=Camiseta+Negra",
        "category": "camisetas",
        "sizes": "S,M,L,XL",
    },
    {
        "id": "2",
        "name": "Sudadera con capucha gris",
        "price": 65,
        "image": "https://placehold.co/600x800/808080/FFFFFF?text=Sudadera+Gris",
        "category": "sudaderas",
        "sizes": "S,M,L",
    },
    {
        "id": "3",
        "name": "Pantalón cargo verde",
        "price": 80,
        "image": "https://placehold.co/600x800/4A5D23/FFFFFF?text=Cargo+Verde",
        "category": "pantalones",
        "sizes": "M,L,XL",
    },
    {
        "id": "4",
        "name": "Camiseta gráfica blanca",
        "price": 40,
        "image": "https://placehold.co/600x800/FFFFFF/000000?text=Camiseta+Blanca",
        "category": "camisetas",
        "sizes": "S,M,L",
    },
    {
        "id": "5",
        "name": "Chaqueta acolchada negra",
        "price": 120,
        "image": "https://placehold.co/600x800/1A1A1A/FFFFFF?text=Chaqueta",
        "category": "chaquetas",
        "sizes": "M,L,XL",
    },
    {
        "id": "6",
        "name": "Gorra logo bordado",
        "price": 25,
        "image": "https://placehold.co/600x800/2C2C2C/FFFFFF?text=Gorra",
        "category": "accesorios",
        "sizes": "Única",
    },
]


def seed():
    db = SessionLocal()

    # Comprobar si ya hay productos para no duplicar
    existing = db.query(Product).count()
    if existing > 0:
        print(f"La base de datos ya tiene {existing} productos. No se añaden más.")
        db.close()
        return

    # Insertar los productos
    for product_data in products_data:
        product = Product(**product_data)
        db.add(product)

    db.commit()
    print(f"Se han insertado {len(products_data)} productos correctamente.")
    db.close()


if __name__ == "__main__":
    seed()