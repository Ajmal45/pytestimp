from flask import Flask, request, jsonify

app = Flask(__name__)

# Fake database
users = {}

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"error": "Missing fields"}, 400

    if email in users:
        return {"error": "User exists"}, 409

    users[email] = password
    return {"message": "User created"}, 201

def get_user(email):
    return users.get(email)

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"error": "Missing fields"}, 400

    user = get_user(email)

    if not user:
        return {"error": "User not found"}, 404

    if user != password:
        return {"error": "Invalid password"}, 401

    return {"token": "fake-jwt-token"}, 200