import re
import fitz  
import csv
class ResumeParser:
    def __init__(self):
        self.csv_file_path = "skills.csv"
        self.resume = ""
        
    def set_resume(self, file):
        self.resume = file
        
    def extract_text_from_pdf(self):
        text = ""
        with fitz.open(self.resume) as doc:
            for page in doc:
                text += page.get_text()
        return text

    def extract_skills_from_resume(self):
        resume_text = self.extract_text_from_pdf(self.resume)
        skills_list = self.read_skills_from_csv(self.csv_file_path)
        return self.extract_skills(resume_text, skills_list)

    def read_skills_from_csv(self):
        skills_list = []
        with open(self.csv_file_path, 'r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                skills_list.extend(row)
        return skills_list

    def extract_skills(resume_text, skills_list):
        skill_patterns = [r'\b' + re.escape(skill) + r'\b' for skill in skills_list]

        skill_regexes = [re.compile(pattern) for pattern in skill_patterns]

        extracted_skills = set()
        for regex in skill_regexes:
            extracted_skills.update(regex.findall(resume_text))

        return extracted_skills

    # Example usage
    # pdf_file_path = "Amin_Roohan_Resume.pdf"  
    # csv_file_path = "skills.csv"
    # skills = extract_skills_from_resume(pdf_file_path, csv_file_path)
    # print("Extracted Skills:", skills)