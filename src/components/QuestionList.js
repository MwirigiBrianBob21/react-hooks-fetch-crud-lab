import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([]);


  // adding the side effects
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((response)=>response.json())
    .then((questions)=> setQuestions(questions))
  }, [])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questions.map((question)=> (<QuestionItem key={question.id} question={question}/>))}
      </ul>

    </section>
  );
}

export default QuestionList;
