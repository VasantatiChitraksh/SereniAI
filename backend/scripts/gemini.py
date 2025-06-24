import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def get_gemini_response(prompt):
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {e}"


# Example usage
if __name__ == "__main__":
    prompt = "Explain black holes like I'm 10 years old."
    # models = genai.list_models()
    # for model in models:
    #     print(f"Name:{model.name} | Description: {model.description}")
    reply = get_gemini_response(prompt)
    print("Gemini says:", reply)
