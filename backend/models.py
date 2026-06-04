from sqlalchemy import Column, Integer, String, Float
from database import Base

class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    colonia = Column(String)
    address = Column(String)
    phone = Column(String)
    hours = Column(String)
    description = Column(String)
    facebook = Column(String)
    lat = Column(Float)
    lng = Column(Float)