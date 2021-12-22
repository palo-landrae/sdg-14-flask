# main.py

from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.json_util import dumps, loads

app = Flask(__name__)

# Stringa di connessione al DB
app.config["MONGO_URI"] = "mongodb+srv://dontu_sdg14:r7FebJpW7usA1xka@cluster0.b47u5.mongodb.net/sdg_14?retryWrites=true&w=majority"

mongo = PyMongo(app)
# Per rispondere alle chiamate cross origin
CORS(app)

# Annotation that allows the function to be hit at the specific URL.
@app.route("/")
# Generic Python functino that returns "Hello world!"
def index():
    return "Hello world!"

# Questa route effettua una find() su tutto il DB (si limita ai primi 100 risultati)
@app.route('/beach_litter', methods=['GET'])
def get_beach_litter():
    beach_litter = mongo.db.beach_litter
    list_cur = list(beach_litter.find({"Code": {"$ne":""}},{"_id":0}))
    return dumps(list_cur)

# Checks to see if the name of the package is the run as the main package.
if __name__ == "__main__":
    # Runs the Flask application only if the main.py file is being run.
    app.run()