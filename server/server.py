import requests
import sys
import pytz
import time
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    print("request received",file=sys.stderr)
    return "Hello world! CHEWYJ"


if __name__ == '__main__':
    app.run(host="localhost", port=7272, debug=True)