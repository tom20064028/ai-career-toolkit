# AI Interview Simulator

Simulate a technical interview based on job description. After user answering the questions, the simulator will then interpret the answer and give the evalution and score. 

## Core Features
1. Generate questions
2. User answer input
3. AI evaluation
4. AI follow-up
5. Final score

## API Design
`POST /api/interview/start`
### Input
```
{
  jd
}
```

### Output
```
{
  question,
  interview_id
}
```

`POST /api/interview/turn`
### Input
```
{
  interview_id,
  question,
  answer
}
```

### Output
```
{
  score,
  feedback,
  next_question
}
```

## Data flow
JD <br/>
↓<br/>
AI question<br/>
↓<br/>
User answer<br/>
↓<br/>
AI feedback<br/>
↓<br/>
Next question