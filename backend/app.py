from flask import Flask
from flask_cors import CORS
from backend.routes import register_routes

# ✅ FIRST create app
app = Flask(__name__)

# ✅ THEN apply CORS
CORS(app)

# ✅ THEN register routes
register_routes(app)

# ✅ Run server
if __name__ == "__main__":
    app.run(debug=True)