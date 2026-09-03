from app.database import engine, SessionLocal, Base
from app.models import Product

Base.metadata.create_all(bind=engine)

products_data = [
    {
        "id": "1",
        "name": "Minding Our Business Tee",
        "price": 25,
        "image": "/mindingrosa.png",
        "hover_image": None,
        "images": "/mindingrosa.png,/fotocamisrosa1.jpg,/fotocamirosa2.jpg",
        "category": "t-shirts",
        "sizes": "S,M,L,XL",
        "description": "Minding our Business. 275 GSM 100% Algodón. Model is 1.80cm, wearing M size.",
    },
    {
        "id": "2",
        "name": "Athletics Tee",
        "price": 25,
        "image": "/athletics.png",
        "hover_image": None,
        "images": "/athletics.png",
        "category": "t-shirts",
        "sizes": "S,M,L,XL",
        "description": "Gutzdept Athletics 2025. 275 GSM 100% Algodón. Model is 1.80cm, wearing M size.",
    },
    {
        "id": "3",
        "name": "No Cap Trucker Hat",
        "price": 30,
        "image": "/gorra-front.png",
        "hover_image": "/gorra-side.png",
        "images": "/gorra-front.png,/gorra-side.png,/gorra-diagonal.png,/gorra-detras.png",
        "category": "accessories",
        "sizes": "One Size",
        "description": "No Cap Trucker Hat. Embroidered logo. One size fits all. Adjustable snapback.",
    },
    {
        "id": "4",
        "name": "Grind and Pray Hoodie",
        "price": 55,
        "image": "/sudaderatransparente.png",
        "hover_image": "/side.png",
        "images": "/sudaderatransparente.png,/side.png,/sudadera-foto1.jpg,/sudadera-foto2.jpg",
        "category": "hoodies",
        "sizes": "S,M,L,XL",
        "description": "Grind and Pray. 400 GSM heavyweight hoodie. Embroidered logo. Model is 1.80cm, wearing M size.",
    },
]


def seed():
    db = SessionLocal()

    db.query(Product).delete()
    db.commit()

    for product_data in products_data:
        product = Product(**product_data)
        db.add(product)

    db.commit()
    print(f"Se han insertado {len(products_data)} productos correctamente.")
    db.close()


if __name__ == "__main__":
    seed()