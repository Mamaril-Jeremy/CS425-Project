from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, auth, firestore, storage

app = Flask(__name__)

cred = credentials.Certificate("service_account.json")
firebase_admin.initialize_app(cred, {
    'storageBucket' : 'gs://plato-49d12.appspot.com'
})

db = firestore.client()
storage = storage.bucket()