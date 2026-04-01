# AI Career Toolkit

AI-powered interview preparation platform that helps developers go from job description analysis to simulated interviews and final evaluation.

---

## 🔥 What makes this different?

Unlike typical interview tools, this system dynamically adapts interview questions based on the candidate’s answers and identified skill gaps.

---

## 🚀 Live Demo

👉 https://jd-resume-match-analyzer.vercel.app/  
(No sign-up required)

---

## 🧠 System Overview

This project is designed as an end-to-end AI workflow:

1. Analyze resume + job description → identify missing skills  
2. Generate initial interview question  
3. Conduct dynamic interview via iterative AI calls  
4. Evaluate performance and generate structured report  

The system continuously adapts the interview based on candidate performance, rather than using static question sets.

---

## 🎯 Core Features

### 📄 Resume Analyzer
Identify skill gaps between a resume and a job description.

- AI resume analysis  
- Missing skills detection  
- Generates interview questions based on gaps  

---

### 🤖 Interview Copilot (Core Product)
End-to-end interview preparation powered by AI.

- Connects analysis → interview → evaluation  
- Passes missing skills into interview flow  
- Enables personalized interview experience  

---

### 🎯 Dynamic Interview Simulator
Simulate a real technical interview with adaptive questioning.

- AI evaluates each answer  
- Generates follow-up questions dynamically  
- Adjusts difficulty based on performance  
- Maintains interview context across turns  

---

### 💻 Coding Interview Judge (Prototype)
Evaluate coding interview answers using AI.

- AI reasoning-based evaluation  
- Detects issues and provides feedback  
- 🚧 Prototype (in progress)  

---

## 🧠 Architecture

The application uses LLM APIs to power multiple workflows:

### 1️⃣ Resume Analysis
Job Description + Resume  
→ Skill analysis  
→ Missing skills  
→ Initial interview question  

### 2️⃣ Dynamic Interview Flow
Question  
→ Candidate answer  
→ AI evaluation  
→ Next question (adaptive)  

### 3️⃣ Coding Evaluation (Prototype)
Coding problem + solution  
→ AI reasoning  
→ Bug detection + score  

---

## 🛠 Tech Stack

- Next.js (App Router)  
- React  
- OpenRouter / LLM API  
- Structured JSON prompting  
- Vercel  

---

## 📁 Project Structure
app/
├ jd-resume-analyzer
├ interview-simulator
├ coding-interview
├ copilot
├ interview
└ api
├ analyze
├ interview
├ interview-contextual
├ interview-start
├ interview-turn
└ interview-finish


---

## 🎯 Design Goals

- Design multi-step AI workflows (not single prompts)  
- Ensure structured and predictable AI outputs  
- Simulate real interview interactions  
- Keep system simple but extensible  

---

## ⚠️ Disclaimer

AI suggestions are indicative and may not fully reflect real hiring decisions.

---

## 👤 Author

Built as a personal project to explore practical LLM integration and product-level AI system design.