# authenticate.py
from fastapi import FastAPI
from mongoDB import users_collection
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/auth")
def authenticate_user(email: str, password: str):
    user = users_collection.find_one({"email": email})
    if not user:
        return JSONResponse(content={"success": False})

    if password.encode('utf-8') == user['password'].encode('utf-8'):
        return JSONResponse(content={"success": True})

    return JSONResponse(content={"success": False})


@app.get("/register_user")
def register_user(email: str, name: str, password: str):
    if users_collection.find_one({"email": email}):
        return JSONResponse(content={"success": False, "message": "User already exists", 'email': email})

    user = {
        "email": email,
        "name": name,
        "password": password
    }
    users_collection.insert_one(user)
    return JSONResponse(content={"success": True, "message": "User registered successfully"})
