import React, { useState } from 'react'
import './createChallenge.scss'
import { ChallengeService } from '../../../services/ChallengeService'

function CreateChallenge() {
  const [challengeName, setChallengeName] = useState('')
  const [challengeDescription, setChallengeDescription] = useState('')
  const [challengeDifficulty, setChallengeDifficulty] = useState('')
  const [category, setCategory] = useState('')
  const [theoretical, setTheoretical] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false)
  const [rightAnswer, setRightAnswer] = useState('')
  const [wrongAnswer1, setWrongAnswer1] = useState('')
  const [wrongAnswer2, setWrongAnswer2] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    ChallengeService.CreateChallenge({
      challengeName: challengeName,
      challengeDescription: challengeDescription,
      challengeDifficulty: challengeDifficulty,
      category: category,
      theoretical: theoretical,
      estimatedTime: estimatedTime,
      rightAnswer: rightAnswer,
      wrongAnswer1: wrongAnswer1,
      wrongAnswer2: wrongAnswer2,
    })
      .then((response) => {
        console.log(response)
        setChallengeName('')
        setChallengeDescription('')
        setChallengeDifficulty('')
        setCategory('')
        setTheoretical('')
        setEstimatedTime('')
        setShowAdditionalInputs(false)
        setRightAnswer('')
        setWrongAnswer1('')
        setWrongAnswer2('')

        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleTheoreticalChange = (value) => {
    setTheoretical(value)
    if (value === 'True') {
      setShowAdditionalInputs(true)
    } else {
      setShowAdditionalInputs(false)
    }
  }

  return (
    <div className="challenge-form-container">
      <form onSubmit={handleSubmit}>
        <label>Challenge Name</label>
        <input
          type="text"
          value={challengeName}
          onChange={(event) => setChallengeName(event.target.value)}
        ></input>
        <label>Challenge Description</label>
        <div className="textarea-container">
          <textarea
            cols={90}
            rows={7}
            value={challengeDescription}
            onChange={(event) => setChallengeDescription(event.target.value)}
          ></textarea>
        </div>
        <label>Challenge Difficulty</label>
        <select
          value={challengeDifficulty}
          onChange={(event) => setChallengeDifficulty(event.target.value)}
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Advanced">Advanced</option>
        </select>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        ></input>
        <label>Theoretical</label>
        <select
          value={theoretical}
          onChange={(event) => handleTheoreticalChange(event.target.value)}
        >
          <option value="">Select if Theoretical</option>
          <option value="True">True</option>
          <option value="False">False</option>
        </select>
        {showAdditionalInputs && (
          <>
            <label>Right Answer</label>
            <input type="text" onChange={(event) => setRightAnswer(event.target.value)} placeholder='Write the right answer here'/>
            <label>Additional Input 2</label>
            <input type="text" onChange={(event) => setWrongAnswer1(event.target.value)} placeholder='Write the first wrong answer here' />
            <label>Additional Input 3</label>
            <input type="text" onChange={(event) => setWrongAnswer2(event.target.value)} placeholder='Write the second wrong answer here' />
          </>
        )}
        <label>Estimated Time</label>
        <input
          type="text"
          value={estimatedTime}
          onChange={(event) => setEstimatedTime(event.target.value)}
        ></input>
        <button type="submit">Create Challenge</button>
      </form>
    </div>
  )
}

export default CreateChallenge
