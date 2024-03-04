from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("../flask/service_account.json")
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
    
if __name__ == '__main__':
    app.run(debug=True)
