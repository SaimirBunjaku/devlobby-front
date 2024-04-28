import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './QuestionCodeEditor.scss';
import CodeEditor from './CodeEditor';
import challenges from './challenges';
import ChallengeService from '../../../services/ChallengeService';

function ChallengeCode() {
  const [question, setQuestion] = useState(null);
  const [showQuestion, setShowQuestion] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      ChallengeService.GetChallengeById(id)
        .then((response) => {
          console.log(response)
          setQuestion(response.challenge)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    catch (error) {
      console.log(error)
    }
  }, [id]);

  console.log(question);

  const handleNextQuestion = () => {
    const currentId = Number(id);
    const nextId = currentId + 1;
    const nextQuestionExists = challenges.some(q => q.id === nextId);

    if (nextQuestionExists) {
      navigate(`/playcodearena/practical/challenge-code/${nextId}`);
    } else {
      console.log('No more questions.');
    }
  };

  return (
    <div className="code-container">
      <div className="left">
        {showQuestion && question ? (
          <>
            <h2>{question.challengeName}</h2>
            <p>{question.challengeDescription}</p>
            <p>{question.challengeDifficulty}</p>
          </>
        ) : (
          <p>Loading question...</p>
        )}
      </div>
      <div className="right-side">
        <CodeEditor
          handleNextQuestion={handleNextQuestion}
          question={question ? question.content : ''}
          showQuestion={showQuestion}
          setShowQuestion={setShowQuestion}
        />
      </div>
    </div>
  );
}

export default ChallengeCode;