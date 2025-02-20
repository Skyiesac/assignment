from flask import Flask
from models import db
from flask_migrate import Migrate
from auth import auth_bp, jwt
from config import Config
from flask_cors import CORS


def create_app():

    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)
    migrate = Migrate(app, db)
    jwt.init_app(app)

    from models import User

    app.register_blueprint(auth_bp, url_prefix="/auth")

    # Create tables
    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
