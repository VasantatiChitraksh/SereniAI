from fastapi import FastAPI
from mongoDB import users_collection  # Assuming db.py has connection

app = FastAPI()

@app.get("/test-db")
def test_db():
    # During registration
    user = {
        "email": "test@example.com",
        "name": "Chitraksh",
        "password": "hashed"
    }
    result = users_collection.insert_one(user)
    print("Inserted:", result.inserted_id)
    return {"inserted_id": str(result.inserted_id)}
