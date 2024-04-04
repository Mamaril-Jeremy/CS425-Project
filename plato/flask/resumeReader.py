import re
import fitz  # PyMuPDF
import csv

def extract_text_from_pdf(pdf_file):
    text = ""
    with fitz.open(pdf_file) as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_skills_from_resume(pdf_file):
    resume_text = extract_text_from_pdf(pdf_file)
    return extract_skills(resume_text)

def extract_skills(resume_text):
    skills_list = ["Python", "Java", "Agile", "Git", "SQL", "HTML", "CSS", "JavaScript", "Communication", "Leadership", "Problem-solving", "FireBase", "Testing and DevOps", "Project Management"]

    skill_patterns = [r'\b' + re.escape(skill) + r'\b' for skill in skills_list]

    skill_regexes = [re.compile(pattern) for pattern in skill_patterns]

    extracted_skills = set()
    for regex in skill_regexes:
        extracted_skills.update(regex.findall(resume_text))

    return extracted_skills

# Example usage
pdf_file_path = "Amin_Roohan_Resume.pdf"  # Replace with the path to your PDF resume

skills = extract_skills_from_resume(pdf_file_path)
print("Extracted Skills:", skills)