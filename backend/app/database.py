# ============================================================
# database.py — Configuración de la conexión a la base de datos
# ============================================================
# Este archivo configura SQLAlchemy para conectar con la BD.
# Soporta tanto SQLite (desarrollo local) como PostgreSQL (producción).
# ============================================================

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Cargar las variables de entorno desde .env
load_dotenv()

# Obtener la URL de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL")

# Si la URL empieza por "postgres://" (formato antiguo de Render/Heroku),
# hay que cambiarla a "postgresql://" (formato que SQLAlchemy entiende)
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Configurar el motor de la base de datos
# connect_args solo es necesario para SQLite (no para PostgreSQL)
if DATABASE_URL and DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

# Fábrica de sesiones: cada petición al backend abre una sesión con la BD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Clase base de la que heredan todos los modelos (tablas)
class Base(DeclarativeBase):
    pass


# Función que FastAPI usa para obtener una sesión de BD en cada petición
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()