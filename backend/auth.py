from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from utils import check_strong_password

auth_bp = Blueprint("auth", __name__)
jwt = JWTManager()


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not all(key in data for key in ["username", "password", "role"]):
        return jsonify({"msg": "Missing fields"}), 400
    
    username = data["username"].strip()
    password = data["password"].strip()
    role = data["role"].strip()

    if role not in ["seller", "buyer"]:
        return jsonify({"msg": "Invalid role"}), 400
    
    if not username or not password:
        return jsonify({"msg": "Fields cannot be empty"}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400

    if not check_strong_password(password):
        return jsonify({"msg": "Password is not strong enough"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, role=role)

    db.session.add(new_user)
    db.session.commit()

    print(f"User registered: {username}, {hashed_password}, {role}")

    return jsonify({"msg": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(
            identity={"username": user.username, "role": user.role}
        )
        return jsonify(access_token=access_token), 200

    print("Invalid credentials")
    return jsonify({"msg": "Invalid credentials"}), 401
