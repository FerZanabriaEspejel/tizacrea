from sqlalchemy.orm import Session
from fastapi import Depends
from database import get_db
from models import Business
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

# Permitir conexión con frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Datos de ejemplo
businesses = [
    {
        "id": 1,
        "name": "Taquería El Sol",
        "category": "Restaurante",
        "colonia": "Centro",
        "lat": 19.837,
        "lng": -98.977,
        "address": "Av. Juárez #12",
        "phone": "7791234567",
        "hours": "9:00 AM - 10:00 PM",
        "description": "Tacos al pastor y comida mexicana.",
        "facebook": "https://facebook.com"
    },
    {
        "id": 2,
        "name": "Papelería Lupita",
        "category": "Papelería",
        "colonia": "Haciendas",
        "lat": 19.850,
        "lng": -98.990,
        "address": "Calle Hidalgo #45",
        "phone": "7799876543",
        "hours": "8:00 AM - 8:00 PM",
        "description": "Útiles escolares e impresiones.",
        "facebook": "https://facebook.com"
    }
]

@app.get("/")
def home():
    return {"message": "Backend funcionando correctamente"}

@app.get("/businesses")
def get_businesses(db: Session = Depends(get_db)):
    businesses = db.query(Business).all()

    return businesses

@app.post("/businesses")
def create_business(
    business_data: dict,
    db: Session = Depends(get_db)
):
    business = Business(**business_data)

    db.add(business)
    db.commit()
    db.refresh(business)

    return business