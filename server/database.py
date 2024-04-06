import firebase_admin
import json
import os
from firebase_admin import db

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

def initFridge(fridgeID):
    #check if fridge has been made
    ref = db.reference("/fridges")
    curFridges = ref.get()
    if fridgeID not in curFridges:
        curFridges[fridgeID] = [{"category":"Meat","data":["filler"]},
                                {"category":"Vegetables","data":["filler"]},
                                {"category":"Dairy","data":["filler"]},
                                {"category":"Seasoning","data":["filler"]}]
    ref.set(curFridges)

def getFridgeData(fridgeID):
    try:
        ref = db.reference(f"/fridges/{fridgeID}")
        data = ref.get()
        for d in data:
            d["data"].remove("filler")
        return data
    except:
        return None

def hasFoodType(food_type, fridge):
    for food_cat in fridge:
        if food_cat["category"] == food_type:
            return True
    return False

def insertItem(fridgeID, itemData):
    ref = db.reference(f"/fridges/{fridgeID}")
    food_type, category = itemData['food_type'], itemData['category']
    fridge = ref.get()
    
    return "something probably happened"

if __name__ == '__main__':
    initApp()
    input("waiting to continue")
    initFridge("JCHEWY")
    insertItem("JCHEWY", {})
    ref = db.reference("/")
    print(getFridgeData("JCHEWY"))
    input("waiting to terminate")
    