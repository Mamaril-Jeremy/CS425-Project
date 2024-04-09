import re
import fitz
import csv
from firebase_admin import firestore

class ResumeParser:
    def __init__(self):
        self.csv_file_path = "skills.csv"
        self.resume = {}
        self.uid = ""
        
    def set_resume(self, file):
        self.resume = file
    
    def set_uid(self, id):
        self.uid = id
        
    def extract_text_from_pdf(self):
        text = ""
        resume_bytes = self.resume.read()
        pdf_document = fitz.open(stream=resume_bytes, filetype="pdf")
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
        return text

    def extract_skills_from_resume(self):
        resume_text = self.extract_text_from_pdf()
        skills_list = self.read_skills_from_csv()
        return self.extract_skills(resume_text, skills_list)

    def read_skills_from_csv(self):
        skills_list = []
        with open(self.csv_file_path, 'r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                skills_list.extend(row)
        return skills_list

    def extract_skills(self, resume_text, skills_list):
        skill_patterns = [r'\b' + re.escape(skill) + r'\b' for skill in skills_list]
        skill_regexes = [re.compile(pattern) for pattern in skill_patterns]
        extracted_skills = set()
        for regex in skill_regexes:
            extracted_skills.update(regex.findall(resume_text))
        return extracted_skills

    def handleStoreSkills(self, db, skills):
        query = db.collection("users").where("userID", "==", self.uid).limit(1)
        queryResult = query.get()
        docRef = queryResult[0].reference
        docRef.update({
            "Skills": skills
        })