from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
print("MONGO_URI is:", os.getenv("MONGO_URI"))
db = client["sereniAI"]  # Make sure this name is consistent
users_collection = db["users"]
entries_collection = db["entries"]


try:
    print(client.list_database_names())  # Should print available DBs
except Exception as e:
    print("Error:", e)
