import requests
import sys
import pytz
import time
import atexit
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import database as fb

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    print("request received",file=sys.stderr)
    return "Hello world! CHEWYJ"

@app.route('/makefridge', methods=['POST'])
def makeFridge():
    data = request.get_json()
    ret = fb.getFridgeData(data['fridgeID'])
    if ret is not None:
        return "FridgeID already in use", 400
    fridgeID = data['fridgeID']
    emails = {}
    names = {}
    ret = fb.initFridge(fridgeID,names,emails)

@app.route('/getdata', methods=['POST'])
def getData():
    data = request.get_json()
    ret = fb.getFridgeData(data['fridgeID'])
    if ret is None:
        return "FridgeID not found", 400
    return ret

@app.route('/insertitem', methods=['POST'])
def insertItem():
    data = request.get_json()
    fridgeID = data["fridgeID"]
    fb.insertItem(fridgeID,data)
    return "dummy"

@app.route('/deleteitem', methods=['POST'])
def deleteItem():
    data = request.get_json()
    fridgeID = data["fridgeID"]
    fb.deleteItem(fridgeID,data)
    return "dummy"

def exit_handler():
    fb.saveState()
    print('My application is ending!')

if __name__ == '__main__':
    atexit.register(exit_handler)
    fb.initApp()
    app.run(host="localhost", port=7272, debug=True)
