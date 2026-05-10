import os
import jwt
from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "hackathon_super_secret_key")
ALGORITHM = "HS256"

app = FastAPI(title="EcoSphere AI Backend", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# --- PROMPT 1A: Crop Doctor Endpoint ---
# Mock Hugging Face pipeline for hackathon speed (avoids downloading models during startup)
class MockCropDoctor:
    def __call__(self, image):
        return [{"label": "Healthy Wheat", "score": 0.95}]

try:
    from transformers import pipeline
    # In production: crop_doctor = pipeline("image-classification", model="linka/plant-disease-classification")
    crop_doctor = MockCropDoctor() 
except Exception as e:
    crop_doctor = MockCropDoctor()

@app.post("/api/v1/agents/crop-doctor")
async def analyze_crop(file: UploadFile = File(...), token: dict = Depends(verify_token)):
    try:
        # Here we would normally read the image and pass to the model
        # contents = await file.read()
        # image = Image.open(io.BytesIO(contents))
        # result = crop_doctor(image)
        
        result = crop_doctor("dummy_image")
        
        return {
            "status": "success",
            "agent": "crop-doctor",
            "filename": file.filename,
            "prediction": result[0]["label"],
            "confidence": result[0]["score"],
            "summary_en": f"The crop appears to be {result[0]['label']} with a confidence of {result[0]['score']*100:.1f}%.",
            "summary_ur": "فصل صحت مند لگ رہی ہے۔" # Mock Urdu translation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- PROMPT 1B: Additional Agent Endpoints ---

@app.get("/api/v1/agents/smart-irrigation")
async def smart_irrigation(
    crop_type: str = Query(..., description="Type of crop"),
    soil_moisture: float = Query(..., description="Current soil moisture percentage"),
    location: str = Query(..., description="Farm location"),
    token: dict = Depends(verify_token)
):
    try:
        # Mock logic
        return {
            "status": "success",
            "agent": "smart-irrigation",
            "data": {
                "watering_schedule": "Water for 2 hours at 6:00 AM tomorrow.",
                "water_savings_potential": "20%",
                "cost_savings": "$15/month"
            },
            "summary_en": f"Soil moisture is low ({soil_moisture}%). Please water {crop_type} tomorrow morning.",
            "summary_ur": f"مٹی کی نمی کم ہے۔ براہ کرم کل صبح {crop_type} کو پانی دیں۔"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/agents/market-intelligence")
async def market_intelligence(
    crop_type: str = Query(...),
    location: str = Query(...),
    token: dict = Depends(verify_token)
):
    try:
        return {
            "status": "success",
            "agent": "market-intelligence",
            "data": {
                "current_price": "$250 per ton",
                "forecast": "Expected to rise by 5% next week",
                "recommendation": "HOLD"
            },
            "summary_en": f"The price for {crop_type} in {location} is rising. Recommendation: Hold for better prices.",
            "summary_ur": f"{location} میں {crop_type} کی قیمت بڑھ رہی ہے۔ تجویز ہے کہ ابھی فروخت نہ کریں۔"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/agents/climate-risk")
async def climate_risk(
    location: str = Query(...),
    days_ahead: int = Query(7),
    token: dict = Depends(verify_token)
):
    try:
        return {
            "status": "success",
            "agent": "climate-risk",
            "data": {
                "flood_risk": "Low",
                "heatwave_alert": "High - Expected in 3 days",
                "recommendations": ["Increase irrigation", "Provide shade if possible"]
            },
            "summary_en": f"Heatwave expected in {location} in 3 days. Increase watering.",
            "summary_ur": f"{location} میں 3 دن بعد شدید گرمی متوقع ہے۔ پانی کی مقدار بڑھا دیں۔"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
