import firebase_admin, json, asyncio
from firebase_admin import credentials, firestore, storage
from google.cloud.firestore_v1.base_query import FieldFilter
import requests

cred = credentials.Certificate("service_account.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'gs://plato-49d12.appspot.com'
})

bucket = storage.bucket()
db = firestore.client()
class Connection:
    def __init__(self, firstUser, secondUser):
        self.user1 = firstUser
        self.user2 = secondUser
        self.timeout = 604800
        self.connection_status = 'Pending'
        self.user1Status = 'Pending'
        self.user2Status = 'Pending'
        self.docName = ''
        
    def check_existing_document(self, ref):
        query1 = ref.where(filter=FieldFilter("user1", "==", self.user1)).where(filter=FieldFilter("user2", "==", self.user2)).get()
        query2 = ref.where(filter=FieldFilter("user1", "==", self.user2)).where(filter=FieldFilter("user2", "==", self.user1)).get()
        if len(query1) > 0:
            return True, query1
        elif len(query2) > 0:
            return True, query2
        return False, None
    
    def handle_pending_connection(self, db):
        collection_ref = db.collection('connections')
        existing, query = self.check_existing_document(collection_ref)
        if not existing:
            try:
                collection_ref.add({
                    'user1': self.user1,
                    'user2': self.user2,
                    'timeoutTimer': self.timeout,
                    'Status': self.connection_status,
                    'user1Status': self.user1Status,
                    'user2Status': self.user2Status
                })

            except Exception as e:
                print("An error has been detected:", e)
        else:
            for doc in query:
                self.docName = doc.id
                doc_ref = collection_ref.document(doc.id)
                doc_snapshot = doc_ref.get()
                doc_data = doc_snapshot.to_dict()
                if doc_data['Status'] == 'False':
                    print("shouldnt of passed")
                else:
                    doc_ref.update({
                        'timeoutTimer': self.timeout,
                        'user1Status': self.user1Status,
                        'user2Status': self.user2Status
                    })
                    self.check_connection_status(query)
                    doc_ref.update({
                        'Status': self.connection_status,
                    })
                
    def check_connection_status(self, query):
        collection_ref = db.collection('connections')
        for doc in query:
            doc_ref = collection_ref.document(doc.id)
            doc_snapshot = doc_ref.get()
            doc_data = doc_snapshot.to_dict()
            if doc_data['user1Status'] == 'True' and doc_data['user2Status'] == 'True':
                self.connection_status = 'True'
            if doc_data['user1Status'] == 'False' or doc_data['user2Status'] == 'False':
                self.connection_status = 'False'
            print(doc_data['Status'])
        
    def set_connection_status(self, status, user):
        if self.user1 == user:
            self.user1Status = status
        elif self.user2 == user:
            self.user2Status = status
        else:
            print("Who clicked the button then")
            
    def store_pending_connections_into_user_database(self, db):
        collection_ref = db.collection('users')
        user1Query = collection_ref.where(filter=FieldFilter("userID", "==", self.user1)).get()
        user2Query = collection_ref.where(filter=FieldFilter("userID", "==", self.user2)).get()
        connection_ref = db.collection('connections').document(self.docName)
        
        for doc in user1Query:
            doc_ref = collection_ref.document(doc.id)
            doc_snapshot = doc_ref.get()
            doc_data = doc_snapshot.to_dict()
            array = doc_data.get('pendingConnections', [])
            array.append(connection_ref)
            doc_ref.update({
                'pendingConnections': array
            })
        
        for doc in user2Query:
            doc_ref = collection_ref.document(doc.id)
            doc_snapshot = doc_ref.get()
            doc_data = doc_snapshot.to_dict()
            array = doc_data.get('pendingConnections', [])
            array.append(connection_ref)
            doc_ref.update({
                'pendingConnections': array
            })
            
      
      
def main():
    connection = Connection("4dlrVm0mb9bsZJkwaQsAwrxCMGQ2", "YKRWZPAOVna9WPLCWWgx3KD2WOX2")
    connection.set_connection_status('True', "4dlrVm0mb9bsZJkwaQsAwrxCMGQ2")
    connection.handle_pending_connection(db)
    connection.set_connection_status('True', "YKRWZPAOVna9WPLCWWgx3KD2WOX2")
    connection.handle_pending_connection(db)
    connection.set_connection_status('False', "YKRWZPAOVna9WPLCWWgx3KD2WOX2")
    connection.handle_pending_connection(db)
    connection.set_connection_status('True', "YKRWZPAOVna9WPLCWWgx3KD2WOX2")
    connection.handle_pending_connection(db)
    connection.store_pending_connections_into_user_database(db)
    
if __name__ == "__main__":
    main()