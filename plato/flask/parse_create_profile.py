from flask import Flask, request
import os
import csv
import firebase_admin
from firebase_admin import credentials, storage

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("service_account.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'gs://plato-49d12.appspot.com'
})
bucket = storage.bucket()

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
    user_uid = request.form['userUID']
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
            user_file_path = f'UNRusers/{username}.json'  # Adjust the file format as needed

            # Create a blob object and upload data to Firebase Storage
            blob = bucket.blob(user_file_path)
            blob.upload_from_string(str(user_data), content_type='application/json')

        # Clean up temporary file
        os.remove(file_path)

        return 'File uploaded successfully'
    else:
        return 'Invalid file or file type'

if __name__ == '__main__':
    app.run(debug=True)
