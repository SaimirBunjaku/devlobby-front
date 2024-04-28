import React, { useState, useEffect } from 'react'
import './TheoreticalQuestions.scss'
import { ChallengeService } from '../../../services/ChallengeService'
import ModalBasic from '../ModalBasic'

function TheoreticalQuestions () {
  const [challenges, setChallenges] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [correctModalOpen, setCorrectModalOpen] = useState(false)
  const [incorrectModalOpen, setIncorrectModalOpen] = useState(false)

  useEffect(() => {
    try {
      ChallengeService.GetChallenges()
        .then(response => {
          console.log(response)
          setChallenges(response.challenges)
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleAnswerChange = (event, challengeId) => {
    const { value } = event.target
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [challengeId]: value
    }))
  }

  const handleSubmit = (event, challengeId, rightAnswer) => {
    event.preventDefault()
    const selectedAnswer = selectedAnswers[challengeId]
    if (selectedAnswer === rightAnswer) {
      console.log('Correct answer selected!')
      setCorrectModalOpen(true)
    } else {
      console.log('Incorrect answer selected.')
      setIncorrectModalOpen(true)
    }
    setSelectedAnswers({})
  }

  const theoreticalQuestions = challenges.filter(
    challenge => challenge.theoretical === 'True'
  )

  return (
    <div className='theoreticalContainer'>
      <h1>Theoretical Questions</h1>
      <div className='theoretical-questions'>
        <div className='questionContainer'>
          {theoreticalQuestions.map(challenge => (
            <div className='question' key={challenge._id}>
              <p>
                {challenge[0]}
                {challenge.challengeDescription}
              </p>
              <form
                onSubmit={event =>
                  handleSubmit(event, challenge._id, challenge.rightAnswer)
                }
              >
                <label>
                  <input
                    type='radio'
                    name={`answer_${challenge._id}`}
                    value={challenge.rightAnswer}
                    id={challenge.rightAnswer}
                    checked={
                      selectedAnswers[challenge._id] === challenge.rightAnswer
                    }
                    onChange={event => handleAnswerChange(event, challenge._id)}
                  />
                  <label htmlFor={challenge.rightAnswer}>
                    {challenge.rightAnswer}
                  </label>
                </label>
                <label>
                  <input
                    type='radio'
                    name={`answer_${challenge._id}`}
                    value={challenge.wrongAnswer1}
                    id={challenge.wrongAnswer1}
                    checked={
                      selectedAnswers[challenge._id] === challenge.wrongAnswer1
                    }
                    onChange={event => handleAnswerChange(event, challenge._id)}
                  />
                  <label htmlFor={challenge.wrongAnswer1}>
                    {challenge.wrongAnswer1}
                  </label>
                </label>
                <label>
                  <input
                    type='radio'
                    name={`answer_${challenge._id}`}
                    value={challenge.wrongAnswer2}
                    id={challenge.wrongAnswer2}
                    checked={
                      selectedAnswers[challenge._id] === challenge.wrongAnswer2
                    }
                    onChange={event => handleAnswerChange(event, challenge._id)}
                  />
                  <label htmlFor={challenge.wrongAnswer2}>
                    {challenge.wrongAnswer2}
                  </label>
                </label>
                <button type='submit'>Submit Answer</button>
              </form>
            </div>
          ))}
        </div>
        <ModalBasic
          title='Congratulations!'
          modalOpen={correctModalOpen}
          setModalOpen={setCorrectModalOpen}
        >
          <p>Congratulations! You've selected the correct answer.</p>
        </ModalBasic>
        <ModalBasic
          title='Incorrect Answer'
          modalOpen={incorrectModalOpen}
          setModalOpen={setIncorrectModalOpen}
        >
          <p>Sorry, the answer you selected is incorrect.</p>
        </ModalBasic>
      </div>
    </div>
  )
}

export default TheoreticalQuestions
