from flask import Flask, request, jsonify
import firebase_admin, json, asyncio
from firebase_admin import credentials, firestore, storage
import requests, datetime
from flask_cors import CORS
# from flask_socketio import SocketIO, emit


class Chat:
    def __init__(self):
        self.current_user = ''
        self.order = 1
        self.chatID = 'a'
        self.message_count = 0
        self.message_input = ''
        self.ID = 'e7Wee661lbq5bP5nlxD2'
        self.timestamp = ''
        self.messages = []
        self.data_received = False
    def check_message(self):
        url = 'https://api.sightengine.com/1.0/text/check.json'
        data = {
            'text': self.message_input,
            'lang': 'en',
            'mode': 'ml',
            'api_user': '97089180',
            'api_secret': 'HBP5e2F44A275VqTL5iGcAagL6'
        }

        try:
            response = requests.post(url, data=data)
            response_data = response.json()
            print(response_data)
            temp_user = self.current_user
            if response_data['moderation_classes']['discriminatory'] > 0.2:
                self.set_current_chat_user('Console')
                self.message_input = 'Can not be displayed due to unprofessional behavior'
            elif response_data['moderation_classes']['insulting'] > 0.2:
                self.set_current_chat_user('Console')
                self.message_input = 'Can not be displayed due to unprofessional behavior'
            elif response_data['moderation_classes']['sexual'] > 0.2:
                self.set_current_chat_user('Console')
                self.message_input = 'Can not be displayed due to unprofessional behavior'
            elif response_data['moderation_classes']['toxic'] > 0.2:
                self.set_current_chat_user('Console')
                self.message_input = 'Can not be displayed due to unprofessional behavior'
            elif response_data['moderation_classes']['violent'] > 0.2:
                self.set_current_chat_user('Console')
                self.message_input = 'Can not be displayed due to unprofessional behavior'
            self.order += 1
        except requests.exceptions.RequestException as e:
            print("Error:", e)
            
    def set_current_chat_user(self, user):
        self.current_user = user
        
    async def handle_message_submit(self, db):

        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        chat_ref = db.collection(f'chat/{self.ID}/messages')

        try:
            chat_ref.add({
                'message': self.message_input,
                'user': self.current_user,
                'messageTime': timestamp,
                'messageOrder': self.order
            })

        except Exception as e:
            print("An error has been detected:", e)
    
    def read_json_file(self, data):
        self.current_user = data['user']
        self.message_input = data['text']
        self.timestamp = data['timestamp']
        self.order = data['messageOrder']
    
    def get_initial_messages(self, db):
        chat_ref = db.collection('chat').document('e7Wee661lbq5bP5nlxD2').collection('messages')
        query = chat_ref.order_by('messageOrder')
        messages = []

        for doc in query.stream():
            data = doc.to_dict()
            message_input = data['message']

            # Exclude template messages
            if not self.is_template_message(message_input):
                messages.append({
                    'timestamp': data['messageTime'],
                    'current_user': data['user'],
                    'message_input': message_input
                })

        return jsonify({'messages': messages})
    
    def get_updates(self, db):
        chat_ref = db.collection('chat').document('e7Wee661lbq5bP5nlxD2').collection('messages')
        query = chat_ref.order_by('messageOrder')

        def on_snapshot(doc_snapshot, changes, read_time):
            self.messages = [
                {
                    'timestamp': doc.to_dict()['messageTime'],
                    'current_user': doc.to_dict()['user'],
                    'message_input': doc.to_dict()['message']
                }
                for doc in doc_snapshot
            ]
        self.data_received = True

        watch = query.on_snapshot(on_snapshot)

    def get_messages(self):
        while not self.data_received:
            pass
        print(self.messages)
        return jsonify({'messages': self.messages})
    
    def is_template_message(self, message):
        template_message = ""

        return message.strip() == template_message.strip()
    