from chat import Chat
import csv
from flask import Flask, request, jsonify
import firebase_admin, asyncio
from firebase_admin import credentials, firestore, storage
#from google.cloud import storage
import os

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("service_account.json")
firebase_admin.initialize_app(cred)

# storage_client = storage.Client()
# bucket_name = 'gs://plato-49d12.appspot.com'
# bucket = storage_client.bucket(bucket_name)

db = firestore.client()

# Create the temp directory if it doesn't exist
if not os.path.exists('temp'):
    os.makedirs('temp')

def parse_csv(file_path):
    data = []
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            user = {
                'userFirstName': row['First'],
                'userLastName': row['Last'],
                'userOccupation': row['Occupation'],
                'userPhoneNumber': row['Phone'],
                'userRole': row['Role'],
                'userMajor': row['Major'],
                'userCountry': row['Country'],
                'userState': row['State'],
                'userCity': row['City']
            }
            data.append(user)
    return data

@app.route('/add_org_user', methods=['POST'])
def upload_file():
    # user_uid = request.form['userUID']
    file = request.files['file']
    if file and file.filename.endswith('.csv'):
        # Save the file temporarily
        file_path = os.path.join('temp', file.filename)
        file.save(file_path)

        # Parse the CSV file
        parsed_data = parse_csv(file_path)
        
        # Upload users to UNRusers folder in Firebase Storage
        for user_data in parsed_data:
            username = user_data['userFirstName'] + '_' + user_data['userLastName']
            user_file_path = f'UNRusers/{username}.json' 
            blob = bucket.blob(user_file_path)
            blob.upload_from_string(str(user_data), content_type='application/json')

        # Clean up temporary file
        os.remove(file_path)

        return 'File uploaded successfully'
    else:
        return 'Invalid file or file type'

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

if __name__ == "__main__":
    app.run(debug=True)