
import unittest
from flask import  jsonify
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("../flask/service_account.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def add_user(user_data):
    try:
        doc_ref = db.collection('users').add(user_data)
        return "User added successfully", 200
    except Exception as e:
        return "Error", 500
    
def get_user_data(user_data):
    try:
        user_id = user_data.get("userID") 
        query = db.collection("users").where("userID", "==", user_id).limit(1)
        query_snapshot = query.get()

        if len(query_snapshot) > 0:
            document_data = query_snapshot[0].to_dict()
            return document_data, 200
        else:
            return "Error: User not found", 404
    except Exception as e:
        return "Error: Internal Server Error", 500


class TestAddUser(unittest.TestCase):
    data = {
        "userCity": "Reno", 
        "userCountry": "United States", 
        "userEmailAddress": "jmamaril@nevada.unr.edu", 
        "userFirstName": "Jeremy", "userID": "nOAU7F1mJcWs289ZdEpAGxgTHpZ2", 
        "userID": "Ipjgepbx82hsrKepq6gwrj7ZGoH3",
        "userLastName": "Mamaril", 
        "userMajor": "Engineering", 
        "userOccupation": "Tutor", 
        "userPhoneNumber": "775-722-6078", 
        "userRole": "mentor", 
        "userState": "Nevada"
    }
   
    def test_add_user_success(self):
        response, status_code = add_user(self.data)
        
        self.assertEqual(status_code, 200)
        self.assertEqual(response, "User added successfully")
        
    def test_add_user_error(self):
        response, status_code = add_user({None})
        
        self.assertEqual(status_code, 500)
        self.assertEqual(response, "Error")

    def test_get_user_data_success(self):
        response, status_code = get_user_data(self.data)
        
        self.assertEqual(status_code, 200)
        self.assertNotEqual(response, "Error")

    def test_get_user_data_error(self):
        response, status_code = get_user_data({"userID": "non_existent_id"})
        
        self.assertEqual(status_code, 404)
        self.assertEqual(response, "Error: User not found")


if __name__ == "__main__":
    unittest.main()