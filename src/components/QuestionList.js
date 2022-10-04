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
  // deps array- if empty only run once
  //-if we have a variable in the deps array,
  // useEffect will run when the value changes
  // you can set the setTimeout in useEffect

  if(!questions){
    return <h2>Loading ...</h2>
  }

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((response)=> response.json())
    .then(()=>{
      const updatedQuestions = questions.filter((q)=> q.id !== id);
      setQuestions(updatedQuestions)
    }) 
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
     method: "PATCH",
     headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex }),
  })
    .then((r)=> r.json())
    .then((updatedQuestion)=> {
      const updatedQuestions = questions.map((q)=>{
        if (q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions)
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questions.map((question)=> (<QuestionItem key={question.id} question={question} onDeleteClick={handleDeleteClick} onAnswerChange={handleAnswerChange}/>))}
      </ul>

    </section>
  );
}

export default QuestionList;
