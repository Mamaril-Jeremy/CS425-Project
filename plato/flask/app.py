from chat import Chat
import csv
from resumeReader import ResumeParser
from connections import Connection
from flask import Flask, request, jsonify, Response
import firebase_admin, asyncio
from firebase_admin import credentials, firestore
import io
from google.cloud.firestore_v1.base_query import FieldFilter

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

if not firebase_admin._apps:
    cred = credentials.Certificate("service_account.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()
@app.route('/add_report', methods=['POST'])  
def add_report():
    try:
        report_data = request.json
        doc_ref = db.collection('reports').add(report_data)
        return jsonify({"message": "Report added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/add_unr_users', methods=['POST'])
def upload_unr_file():
    file = request.files['file']
    if file and file.filename.endswith('.csv'):
        try:
            with io.StringIO(file.stream.read().decode("utf-8")) as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    user_data = {
                        'First': row['First'],
                        'Last': row['Last'],
                        'Occupation': row['Occupation'],
                        'Phone': row['Phone'],
                        'Role': row['Role'],
                        'Major': row['Major'],
                        'Country': row['Country'],
                        'State': row['State'],
                        'City': row['City'],
                        'Organization': "University of Nevada, Reno"
                    }
                    db.collection('org_users').document('unr').collection('unr_uncreated_users').add(user_data)

            return jsonify({'message': 'Data uploaded successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return 'Invalid file or file type', 400

@app.route('/add_unlv_users', methods=['POST'])
def upload_unlv_file():
    file = request.files['file']
    if file and file.filename.endswith('.csv'):
        try:
            with io.StringIO(file.stream.read().decode("utf-8")) as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    user_data = {
                        'First': row['First'],
                        'Last': row['Last'],
                        'Occupation': row['Occupation'],
                        'Phone': row['Phone'],
                        'Role': row['Role'],
                        'Major': row['Major'],
                        'Country': row['Country'],
                        'State': row['State'],
                        'City': row['City'],
                        'Organization': "University of Nevada, Las Vegas"
                    }
                    db.collection('org_users').document('unlv').collection('unlv_uncreated_users').add(user_data)

            return jsonify({'message': 'Data uploaded successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return 'Invalid file or file type', 400
    
@app.route('/check_user', methods=['POST'])
def check_user():
    data = request.json
    selected_university = data['selectedUniversity']
    first_name = data['firstName']
    last_name = data['lastName']

    if selected_university == 'University of Nevada, Reno':
        collection_path = 'org_users/unr/unr_uncreated_users'
    elif selected_university == 'University of Nevada, Las Vegas':
        collection_path = 'org_users/unlv/unlv_uncreated_users'
    else:
        return jsonify({'error': 'Invalid university'}), 400

    user_ref = db.collection(collection_path).where('First', '==', first_name).where('Last', '==', last_name).limit(1)
    users = user_ref.stream()

    user_data = {}
    for user in users:
        user_data = user.to_dict()
        break  # Assuming only one user should match, so breaking after the first one

    if user_data:
        response = {
            'exists': True,
            'userData': {
                'First': user_data.get('First', ''),
                'Last': user_data.get('Last', ''),
                'Occupation': user_data.get('Occupation', ''),
                'Phone': user_data.get('Phone', ''),
                'Role': user_data.get('Role', ''),
                'Major': user_data.get('Major', ''),
                'Country': user_data.get('Country', ''),
                'State': user_data.get('State', ''),
                'City': user_data.get('City', '')
            }
        }
    else:
        response = {'exists': False}

    return jsonify(response)

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

@app.route('/get_initial_messages/<chat_id>', methods=['GET'])
def handle_get_data(chat_id):
    return chat_instance.get_initial_messages(db, chat_id)

@app.route('/get_message_updates', methods=['GET'])
def handle_update():
    chat_instance.get_updates(db)
    return chat_instance.get_messages()

parser_instance = ResumeParser()

@app.route('/parse_resume_skills', methods=['POST'])
def parse_resume():
    resume = request.files['file']
    userUID = request.form['userUID']
    parser_instance.set_resume(resume)
    parser_instance.set_uid(userUID)
    skills = parser_instance.extract_skills_from_resume()
    parser_instance.handleStoreSkills(db, skills)
    response_data = {'message': 'Data received successfully'}
    response = jsonify(response_data)
    return response
    
@app.route('/manage_connections', methods=['POST'])
def manage_connections():
    user1 = request.form['currentUser']
    user2 = request.form['viewedUser']
    connection = Connection(user1, user2)
    selection = request.form['selection']
    selectionUser = 0
    originalSelection = ''
    ref = db.collection('connections')
    query1 = ref.where(filter=FieldFilter("user1", "==", user1)).where(filter=FieldFilter("user2", "==", user2)).get()
    query2 = ref.where(filter=FieldFilter("user1", "==", user2)).where(filter=FieldFilter("user2", "==", user1)).get()
    if len(query1) > 0:
        selectionUser = 1
        for doc in query1:
            originalSelection = ''
            doc_ref = ref.document(doc.id)
            doc_snapshot = doc_ref.get()
            doc_data = doc_snapshot.to_dict()
            originalSelection = doc_data['user2Status']
    elif len(query2) > 0:
        selectionUser = 2
        for doc in query2:
            originalSelection = ''
            doc_ref = ref.document(doc.id)
            doc_snapshot = doc_ref.get()
            doc_data = doc_snapshot.to_dict()
            originalSelection = doc_data['user1Status']

    connection.set_connection_status(selection, selectionUser, originalSelection)
    connection.handle_pending_connection(db)
    response_data = {'message': 'Data received successfully'}
    response = jsonify(response_data)
    return response

@app.route('/disconnect_user', methods=['POST'])
def disconnect_user():
    collection_ref = db.collection('users')
    viewedUser = request.form['viewedUser']
    currentUser =  request.form['currentUser']
    user1Query = collection_ref.where(filter=FieldFilter("userID", "==", viewedUser)).get()
    user2Query = collection_ref.where(filter=FieldFilter("userID", "==", currentUser)).get()
    chatId = request.form['chatRef']
    chatRef = db.collection('chat').document(chatId)
    for doc in user1Query:
        doc_ref = collection_ref.document(doc.id)
        array = [chatRef]
        doc_ref.update({
            'Chats': firestore.ArrayRemove(array),
        })
    for doc in user2Query:
        doc_ref = collection_ref.document(doc.id)
        array = [chatRef]
        doc_ref.update({
            'Chats': firestore.ArrayRemove(array),
        })
    chatRef.delete()
    connection = Connection(currentUser, viewedUser)
    connection.set_connection_status('False', 1, 'Pending')
    connection.handle_pending_connection(db)
    response_data = {'message': 'Data received successfully'}
    response = jsonify(response_data)
    return response


if __name__ == "__main__":
    app.run(debug=True)