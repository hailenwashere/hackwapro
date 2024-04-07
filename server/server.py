import requests
import sys
import pytz
import time
import atexit
import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import database as fb
import gpt


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    print("request received",file=sys.stderr)
    return "Hello world! CHEWYJ"

@app.route('/getdata', methods=['POST'])
def getData():
    data = request.get_json()
    ret = fb.getFridgeData(data['fridgeID'])
    if ret is None:
        return "FridgeID not found", 400
    return ret

@app.route('/putData', methods=['POST'])
def putData():
    return "dummy"

@app.route('/askgpt', methods=['POST'])
def ask_chatgpt():
    data = request.get_json()
    prompt = data["prompt"]
    response = gpt.chat(prompt)['message']['content']
    temp = {"response" : response}
    return json.dumps(temp)


def exit_handler():
    fb.saveState()
    print('My application is ending!')

if __name__ == '__main__':
    atexit.register(exit_handler)
    fb.initApp()
    app.run(host="localhost", port=7272, debug=True)
