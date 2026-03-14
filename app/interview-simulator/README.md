# AI Interview Simulator

AI Interview Simulator is a web application that simulates a technical interview using LLMs.

## Project description

The system generates interview questions based on a job description, evaluates candidate answers, and provides feedback and follow-up questions.

## Features
- AI-generated interview questions
- Candidate answer evaluation
- Context-aware follow-up questions
- Interview history tracking
- Final performance evaluation

## Architecture

<div style="text-align: center">
JD <br />
↓ <br />
AI generate question <br />
↓ <br />
User answer <br />
↓ <br />
AI evaluate answer <br />
↓ <br />
AI generate follow-up question <br />
↓ <br />
Repeat <br />
↓ <br />
Final evaluation
</div>

## Tech stack

Next.js<br />
OpenAI / OpenRouter API<br />
React state management<br />
Structured JSON prompting

## Demo

1. Paste job description
2. Start interview
3. Answer questions
4. Receive AI feedback and score