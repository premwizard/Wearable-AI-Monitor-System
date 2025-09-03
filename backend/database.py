from pymongo import MongoClient
from datetime import datetime

# MongoDB connection (replace with your URI)
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "wearable_monitor"
COLLECTION_NAME = "vitals"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def insert_vitals(date, steps, hr, spo2):
    collection.insert_one({
        "date": date,
        "steps": steps,
        "heart_rate": hr,
        "spo2": spo2,
        "created_at": datetime.utcnow()
    })

def get_all_vitals():
    return list(collection.find({}, {"_id": 0}))
