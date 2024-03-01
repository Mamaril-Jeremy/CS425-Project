from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore, storage
import requests, datetime

app = Flask(__name__)

cred = credentials.Certificate("service_account.json")
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'gs://plato-49d12.appspot.com'
})

db = firestore.client()
storage = storage.bucket()

class Chat:
    def __init__(self):
        self.current_user = ''
        
    def check_message(self, message):
        url = 'https://api.sightengine.com/1.0/text/check.json'
        data = {
            'text': message,
            'lang': 'en',
            'mode': 'ml',
            'api_user': '97089180',
            'api_secret': 'HBP5e2F44A275VqTL5iGcAagL6'
        }
        headers = {'Content-Type': 'multipart/form-data'}
        try:
            response = requests.post(url, data=data, headers=headers)
            response_data = response.json()
            print(response_data)
            temp_user = current_user
            if response_data['moderation_classes']['discriminatory'] > 0.2:
                self.set_current_chat_user('Console')
                message_input = 'Can not be displayed due to unprofessional behavior'
            elif response_data['moderation_classes']['insulting'] > 0.2:
                self.set_current_chat_user('Console')
                message_input = 'Can not be displayed due to unprofessional behavior'
            elif response_data['moderation_classes']['sexual'] > 0.2:
                self.set_current_chat_user('Console')
                message_input = 'Can not be displayed due to unprofessional behavior'
            elif response_data['moderation_classes']['toxic'] > 0.2:
                self.set_current_chat_user('Console')
                message_input = 'Can not be displayed due to unprofessional behavior'
            elif response_data['moderation_classes']['violent'] > 0.2:
                self.set_current_chat_user('Console')
                message_input = 'Can not be displayed due to unprofessional behavior'
            handle_message_submit(ID)
            order += 1
        except requests.exceptions.RequestException as e:
            print("Error:", e)
            
    def set_current_chat_user(self, user):
        global current_user
        current_user = user
        
async def handle_message_submit(ID):
    set_current_chat_user('Jeremy Mamaril')

    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    messageCount += 1

    db = firestore.client()
    chat_ref = db.collection(f'chat/{ID}/messages')

    try:
        await chat_ref.add({
            'message': message_input,
            'user': current_user,
            'messageTime': timestamp,
            'messageOrder': order
        })

        chat_update_ref = db.collection('chat')
        q = chat_update_ref.where('chatID', '==', chatID).limit(1)
        query_snapshot = await q.get()

        for doc in query_snapshot:
            doc_ref = doc.reference
            await doc_ref.update({'numMessages': message_count})

    except Exception as e:
        print("An error has been detected:", e)