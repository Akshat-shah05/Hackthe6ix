from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
from pymongo import MongoClient, errors
from dotenv import load_dotenv
import os
from openai import OpenAI
import httpx
from bson import ObjectId
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = "test"
if not MONGODB_URI:
    exit(1)

try:
    client = MongoClient(MONGODB_URI)
    db = client[DATABASE_NAME]
except errors.ServerSelectionTimeoutError as err:
    db = None

API_KEY = os.getenv("BARCODE_API_KEY")
API_URL = "https://api.barcodelookup.com/v3/products"

class UserInput(BaseModel):
    id: str
    q1: list[str]
    q2: list[str]
    q3: list[str]
    q4: list[str]
    q5: list[str]
    q6: list[str]

@app.get("/debug/collections")
async def get_all_collections():
    if db is None:
        return {"error": "Not connected to the database"}
    
    collections = db.list_collection_names()
    return {"collections": collections}

@app.get("/debug/documents/{collection_name}")
async def get_all_documents(collection_name: str):
    if db is None:
        return {"error": "Not connected to the database"}
    
    collection = db[collection_name]
    documents = list(collection.find().limit(10))

    for document in documents:
        if '_id' in document:
            document['_id'] = str(document['_id'])

    return {"documents": documents}

@app.get("/debug/product_by_name/{product_name}")
async def get_product_by_name(product_name: str):
    if db is None:
        return {"error": "Not connected to the database"}

    product = db.Products.find_one({"product_name": product_name})
    
    if not product:
        return {"error": "Product not found"}
    
    return {"product": product}

async def get_product_name_from_barcode(barcode):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_URL}?barcode={barcode}&formatted=y&key={API_KEY}")
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching data from Barcode Lookup API")
    
    data = response.json()
    if "products" not in data or not data["products"]:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_name = data["products"][0]["title"]
    return product_name

def get_ingredients_from_product_name(product_name):
    if db is None:
        raise HTTPException(status_code=500, detail="Not connected to the database")
    
    product = db.Products.find_one({"product_name": product_name})
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found in the database")
    
    ingredients = product.get("ingredients", "")
    if not ingredients:
        raise HTTPException(status_code=404, detail="Ingredients not found for the given product name")
    
    ingredients_list = ingredients.split(", ")
    return ingredients_list

def get_product_recommendations(not_used_products):
    if db is None:
        return []
    
    recommendations = []
    for product_type in not_used_products:
        product = db.Products.find_one({"product_type": product_type})
        if product:
            recommendations.append(product)
    return recommendations

def extract_score_from_response(response_text):
    for word in response_text.split():
        if word.isdigit():
            return int(word)
    raise ValueError(f"Could not find a numerical score in the response: {response_text}")

def prompt_gpt(ingredients, user_info):
    ingredient_scores_responses = {}
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    for ingredient in ingredients:
        prompt = f"Based on the following user information: {user_info}, rate the ingredient '{ingredient}' on a scale from 1 to 3, where 1 is bad and 3 is good."
        response = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="gpt-3.5-turbo"
        )
        response_text = response.choices[0].message.content.strip()
        print(f"Response for ingredient '{ingredient}': {response_text}")
        score = extract_score_from_response(response_text)
        ingredient_scores_responses[ingredient] = {
            "score": score,
            "response": response_text
        }
    return ingredient_scores_responses

def calculate_average_score(ingredient_scores_responses):
    if not ingredient_scores_responses:
        return 0.0
    total_score = sum(entry['score'] for entry in ingredient_scores_responses.values())
    return round(total_score / len(ingredient_scores_responses), 2)

@app.post("/process_user_input")
async def process_user_input(user_input: UserInput):
    product_name = await get_product_name_from_barcode(user_input.id)

    ingredients = get_ingredients_from_product_name(product_name)

    user_info = {
        "Age": user_input.q1[0],
        "Sex": user_input.q2[0],
        "Skin Type": user_input.q3[0],
        "Primary Skin Concerns": user_input.q4,
        "Current Skincare Routine": user_input.q5,
        "Sun Exposure": user_input.q6[0],
    }

    ingredient_scores = prompt_gpt(ingredients, user_info)

    average_score = calculate_average_score(ingredient_scores)

    used_products = user_input.q5
    all_product_types = [
        "Face wash / Cleanser", "Moisturizer", "Serums", 
        "Toners", "Sunscreen", "Physical Exfoliants", "Chemical Exfoliants"
    ]
    not_used_products = list(set(all_product_types) - set(used_products))
    recommendations = get_product_recommendations(not_used_products)

    response = {
        "ingredient_scores": ingredient_scores,
        "average_score": average_score,
        "recommendations": recommendations,
    }
    return response
