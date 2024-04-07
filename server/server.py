import requests
import sys
import time
import email_details as e_d
import atexit
import json
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import database as fb
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import gpt
app = Flask(__name__)
CORS(app)

def sendEmail(data,req_id):
    acc_link = f"http://localhost:7272/accept?req_id={req_id}"
    rej_link = f"http://localhost:7272/reject?req_id={req_id}"
    requester = data["requester"]
    requestee = data["requestee"]
    ingredient = data["category"]
    qty = data["quantity"]
    fridgeID = data["fridgeID"]
    receiver_email = fb.getEmail(fridgeID,requestee)
    password = e_d.get_password()
    sender_email = e_d.get_email()
    port = 465
    message = MIMEMultipart("alternative")
    message["Subject"] = "multipart test"
    message["From"] = sender_email
    message["To"] = receiver_email
    message1 = f"Hello {requestee}!\n{requester} would like to use {qty} of {ingredient}.\n\
        Click {acc_link} to accept the request.\n \
            Click {rej_link} to reject the request.\n"
    message2 = f"""\
        <html>
        <body>
            <p>Hello {requestee}!<br>
            {requester} would like to use {qty} of {ingredient}<br>
            <a href="http://www.realpython.com">Click Here to Accept</a> <br>
            <a href="http://www.realpython.com">Click Here to Reject</a> 
            </p>
        </body>
        </html>
        """
    part1 = MIMEText(message1,"plain")
    part2 = MIMEText(message2,"html")
    message.attach(part1)
    message.attach(part2)
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
        

@app.route('/')
def hello():
    print("request received",file=sys.stderr)
    return "Hello world! CHEWYJ"

@app.route('/makefridge', methods=['POST'])
def makeFridge():
    data = request.get_json()
    ret = fb.getFridgeData(data['code'])
    if ret is not None:
        return "FridgeID already in use", 400
    fridgeID = data['code']
    emails = data['emailArray']
    names = data['nameArray']
    ret = fb.initFridge(fridgeID,names,emails)
    return "Initialized"

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

@app.route('/request', methods=['POST'])
def makeRequest():
    data = request.get_json()
    req_id = fb.makeRequest(data)
    sendEmail(data,req_id)
    return "Request no longer exists."

@app.route('/accept', methods=['POST'])
def acceptRequest():
    req_id = request.args.get("request_id")
    if fb.requestExists(req_id):
        res = "!" if fb.acceptRequest(req_id) else " but there was not enough left."
        return "Request accepted"+res
    return "Request no longer exists."

@app.route('/reject', methods=['POST'])
def rejectRequest():
    req_id = request.args.get("request_id")
    if fb.requestExists(req_id):
        fb.rejectRequest(req_id)
        return "Request Rejected"
    return "Request no longer exists."

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
