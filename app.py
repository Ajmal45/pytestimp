from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# Explicitly allow your React port to prevent preflight (options) blocks
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# Local connection string (No password needed by default)
MONGO_URI = "mongodb://localhost:27017/"

client = MongoClient(MONGO_URI)
db = client["Redblox_Local_DB"]
users_collection = db["Staff_Members"]

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    # 1. ADD THIS LINE: Capture the username sent from React
    username = data.get("username") 
    email = data.get("email")
    password = data.get("password")

    # 2. UPDATE THIS: Ensure username is also checked
    if not username or not email or not password:
        return jsonify({"error": "Missing fields: Name, Email, and Password are required"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Staff already exists"}), 409

    hashed_pw = generate_password_hash(password)
    
    # 3. UPDATE THIS: Include username in the database document
    users_collection.insert_one({
        "username": username, 
        "email": email, 
        "password": hashed_pw
    })
    
    return jsonify({"message": "Staff member created locally!"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})

    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful!"}), 200

if __name__ == "__main__":
    app.run(debug=True)