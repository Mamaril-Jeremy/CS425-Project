from chat import Chat
from resumeReader import ResumeParser
from flask import Flask, request, jsonify
import firebase_admin, asyncio
from firebase_admin import credentials, firestore, storage

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("service_account.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

@app.route('/add_user', methods=['POST'])  
def add_user():
    try:
        user_data = request.json
        doc_ref = db.collection('users').add(user_data)
        return jsonify({"message": "User added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_user_data', methods=['GET', 'POST'])
def get_user_data():
    try:
        user_id = request.json.get("user_id")
        query = db.collection("users").where("userID", "==", user_id).limit(1)
        query_snapshot = query.get()

        if query_snapshot:
            document_data = query_snapshot[0].to_dict()
            return jsonify({"users": document_data}), 200
        else:
            return jsonify({"error": "No documents found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/update_user_data', methods=['POST']) 
def update_user_data():
    try:
        user_data = request.json
        user_id = user_data.get("userID")
        if user_id:
            docs = db.collection('users').where("userID", "==", user_id).get()
            for doc in docs:
                doc.reference.update(user_data)
            return jsonify({"message": "User info updated successfully"}), 200
        else:
            return jsonify({"error": "UserID not provided"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

chat_instance = Chat()

@app.route('/get_data_from_chat', methods=['POST'])
def get_data_from_chat():
    
    data = request.json  
    chat_instance.read_json_file(data)  
    chat_instance.check_message()  
    asyncio.run(chat_instance.handle_message_submit(db))
    response_data = {'message': 'Data received successfully'}
    response = jsonify(response_data)
    return response

@app.route('/get_initial_messages', methods=['GET'])
def handle_get_data():
    return chat_instance.get_initial_messages(db)

@app.route('/get_message_updates', methods=['GET'])
def handle_update():
    chat_instance.get_updates(db)
    return chat_instance.get_messages()

parser_instance = ResumeParser()

@app.route('/parse_resume_skills', methods=['POST'])
def parse_resume():
    data = request.json
    parser_instance.set_resume(data)
    parser_instance.extract_skills_from_resume()
    

if __name__ == "__main__":
    app.run(debug=True)
