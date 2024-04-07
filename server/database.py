import firebase_admin
import json
import os
from firebase_admin import db
import uuid
from datetime import datetime, date, timedelta

cred_obj = firebase_admin.credentials.Certificate('./secrets/ourfridge-66c55-firebase-adminsdk-oai76-5fcc197c33.json')
database_url = "https://ourfridge-66c55-default-rtdb.firebaseio.com/"
default_app = ""
def initApp():
    firebase_admin.initialize_app(cred_obj, {'databaseURL':database_url})
    print('init')
    ref = db.reference("/")
    if os.path.isfile('data.json'):
        with open("data.json", "r") as f:
            file_contents = json.load(f)
        ref.set(file_contents)
        print('loaded prev state')
    else:
        ref.set({"fridges":{"dummy":["wow real data"]}})

def saveState():
    ref = db.reference("/")
    data = ref.get()
    with open('data.json','w') as f:
        json.dump(data, f)

def initFridge(fridgeID, names, emails):
    #check if fridge has been made
    ref = db.reference("/fridges")
    curFridges = ref.get()
    if fridgeID not in curFridges:
        curFridges[fridgeID] = {"emails":{}}
        for i, name in enumerate(names):
            if name == "":
                continue
            curFridges[fridgeID]["emails"][name] = emails[i]
    ref.set(curFridges)

def getFridgeData(fridgeID):
    try:
        ref = db.reference(f"/fridges/{fridgeID}")
        data = ref.get()
        return data
    except:
        return None

def insertItem(fridgeID, itemData):
    ref = db.reference(f"/fridges/{fridgeID}")
    food_type, category = itemData['food_type'], itemData['category']
    owner, quantity, expiration = itemData['owner'], int(itemData['quantity']), itemData['expiration']
    fridge = ref.get()
    if (food_type not in fridge):
        fridge[food_type] = {}
    if category not in fridge[food_type]:
        fridge[food_type][category] = {"total_quantity":0,"min_expiry":expiration,"ingredient_info":{}}
    fridge[food_type][category]["ingredient_info"][owner] = {
        "quantity":quantity,
        "expiration":expiration
    }
    fridge[food_type][category]["total_quantity"]+=quantity
    
    cur = datetime.strptime(expiration, "%m/%d/%Y")
    prev = datetime.strptime(fridge[food_type][category]["min_expiry"], "%m/%d/%Y")
    if (cur-prev).days < 0:
        fridge[food_type][category]["min_expiry"] = expiration
    ref.set(fridge)
    return "something probably happened"

def deleteItem(fridgeID, itemData):
    ref = db.reference(f"/fridges/{fridgeID}")
    food_type, category = itemData['food_type'], itemData['category']
    owner, quantity = itemData['owner'], int(itemData['quantity'])
    fridge = ref.get()
    if fridge[food_type][category]["ingredient_info"][owner]["quantity"] < quantity:
        return False
    fridge[food_type][category]["ingredient_info"][owner]["quantity"]-=quantity
    fridge[food_type][category]["total_quantity"]-=quantity
    if fridge[food_type][category]["ingredient_info"][owner]["quantity"] == 0:
        del fridge[food_type][category]["ingredient_info"][owner]
        if len(fridge[food_type][category]["ingredient_info"]) == 0:
            del fridge[food_type][category]
            ref.set(fridge)
            return "something probably happened"
        min_time = datetime.strptime("12/30/2100", "%m/%d/%Y")
        for p in fridge[food_type][category]["ingredient_info"]:
            ingredient = fridge[food_type][category]["ingredient_info"][p]
            if (min_time-datetime.strptime(ingredient["expiration"], "%m/%d/%Y")).days > 0:
                min_time=ingredient["expiration"]
    fridge[food_type][category]["min_expiry"] = min_time
    print(fridge)
    ref.set(fridge)
    return True

def makeRequest(reqBody):
    req_id = uuid.uuid1()
    ref = db.reference(f"/requests")
    requests = ref.get()
    requests[req_id] = {
        "fridgeID": reqBody["fridgeID"],
        "requester": reqBody["requester"],
        "requestee": reqBody["requestee"],
        "food_type": reqBody["food_type"],
        "category": reqBody["category"],
        "quantity": reqBody["quantity"]
    }
    ref.push(requests)
    return req_id

def requestExists(req_id):
    ref = db.reference(f"/requests")
    requests = ref.get()
    if req_id not in requests:
        return False
    return True

def acceptRequest(req_id):
    ref = db.reference(f"/requests")
    requests = ref.get()
    req_data = requests[req_id]
    del requests[req_id]
    ref.set(requests)
    fridgeID = req_data["fridgeID"]
    req_data["owner"] = req_data["requestee"]
    return deleteItem(fridgeID,req_data)
    
        
def rejectRequest(req_id):
    ref = db.reference(f"/requests")
    requests = ref.get()
    del requests[req_id]
    ref.set(requests)

def getEmail(fridgeID, name):
    ref = db.reference(f"/fridges/{fridgeID}/emails")
    return ref.get()[name]
    
if __name__ == '__main__':
    initApp()
    input("waiting to continue")
    initFridge("JCHEWY")
    insertItem("JCHEWY", {})
    ref = db.reference("/")
    print(getFridgeData("JCHEWY"))
    input("waiting to terminate")
    