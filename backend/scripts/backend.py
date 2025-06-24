# authenticate.py
from fastapi import FastAPI
from mongoDB import users_collection
from mongoDB import entries_collection
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini import get_gemini_response
import json

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

class Entry(BaseModel):
    email: str
    mood: str
    text: str
    timestamp: str

@app.post("/create_entry")
def create_entry(entry: Entry):
    entry_doc = {
        "email": entry.email,
        "mood": entry.mood,
        "text": entry.text,
        "timestamp": entry.timestamp
    }
    entries_collection.insert_one(entry_doc)
    return JSONResponse(content={"success": True, "message": "Entry created successfully"})

@app.get("/get_user_data")
def get_user_data(email:str):
    user = users_collection.find_one({"email": email})
    if not user:
        return JSONResponse(content={"success": False, "message": "User not found"})
    
    return JSONResponse(content={"success": True,"email": user["email"], "name": user["name"]})

@app.get("/get_entries")
def get_entries(email: str):
    entries = list(entries_collection.find({"email": email}))
    if not entries:
        return JSONResponse(content={"success": False, "message": "No entries found"})
    entries = [{"mood": entry["mood"], "note": entry["text"], "timestamp": entry["timestamp"]} for entry in entries]
    return JSONResponse(content={"success": True, "entries": entries})

@app.get("/get_suggestions")
def get_suggestions(email: str):
    entries = list(entries_collection.find({"email": email}))
    if not entries:
        return JSONResponse(content={"success": False, "message": "No mood entries found"})

    simplified_entries = [
        {"date": e.get("timestamp"), "mood": e.get("mood"), "note": e.get("text", "")}
        for e in entries
    ]

    prompt = (
        f"Based on the following mood entries: {simplified_entries}, "
        f"return 3 suggestions in pure JSON format as a list of objects, each with 'suggestion' and 'what it improves'. "
        f"DO NOT include any explanation, just valid JSON."
    )

    raw_response = get_gemini_response(prompt)
    print("🟡 Raw Gemini Output:\n", raw_response)  # Debug print

    # Try parsing response as JSON
    suggestions = json.loads(raw_response.strip())
    if not isinstance(suggestions, list):
        raise ValueError("Gemini did not return a JSON array.")

    return JSONResponse(content={"success": True, "suggestions": suggestions})              
