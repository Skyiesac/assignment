from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Cart, Product, User

product_bp = Blueprint("product", __name__)


@product_bp.route("/product", methods=["POST"])
@jwt_required()
def add_product():
    data = request.get_json()
    current_user = get_jwt_identity()

    user = User.query.filter_by(username=current_user["username"]).first()
    if user.role != "seller":
        return jsonify({"msg": "Only sellers can add products"}), 403

    if not all(key in data for key in ["name", "price"]):
        return jsonify({"msg": "Missing fields"}), 400

    new_product = Product(name=data["name"], price=data["price"], seller_id=user.id)
    db.session.add(new_product)
    db.session.commit()
    
    return jsonify({"msg": "Product added successfully"}), 201


@product_bp.route("/products/<int:product_id>", methods=["DELETE"])
@jwt_required()
def delete_product(product_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user["username"]).first()

    if user.role != "buyer":
        return jsonify({"msg": "Only buyers can delete products"}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"msg": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"msg": "Product deleted successfully"}), 200


@product_bp.route("/products/all", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([{"id": p.id, "name": p.name, "price": p.price} for p in products]), 200


@product_bp.route("/cart", methods=["POST"])
@jwt_required()
def add_to_cart():
    data = request.get_json()
    current_user = get_jwt_identity()

    user = User.query.filter_by(username=current_user["username"]).first()
    if user.role != "buyer":
        return jsonify({"msg": "Only buyers can add to cart"}), 403

    product = Product.query.get(data["product_id"])
    if not product:
        return jsonify({"msg": "Product not found"}), 404

    cart_item = Cart(user_id=user.id, product_id=product.id)
    db.session.add(cart_item)
    db.session.commit()

    return jsonify({"msg": "Product added to cart"}), 201



@product_bp.route("/cart/<int:cart_id>", methods=["DELETE"])
@jwt_required()
def remove_from_cart(cart_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user["username"]).first()

    cart_item = Cart.query.get(cart_id)
    if not cart_item or cart_item.user_id != user.id:
        return jsonify({"msg": "Item not found or unauthorized"}), 403

    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify({"msg": "Product removed from cart"}), 200


@product_bp.route("/get/cart", methods=["GET"])
@jwt_required()
def get_cart():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user["username"]).first()

    cart_items = Cart.query.filter_by(user_id=user.id).all()
    return jsonify([{"cart_id": item.id, "product_id": item.product_id} for item in cart_items]), 200
