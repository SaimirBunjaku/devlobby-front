import React, { useState, useEffect } from 'react'
import axios from 'axios'

function EditTable({ challengeId, onClose }) {
  const [value, setValue] = useState({
    challengeName: '',
    challengeDescription: '',
    challengeDifficulty: '',
    category: '',
    theoretical: '',
    rightAnswer: '',
    wrongAnswer1: '',
    wrongAnswer2: '',
    estimatedTime: '',
  })

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/challenge/${challengeId}`)
      .then((response) => {
        setValue(response.data.challenge)
      })
      .catch((err) => console.log(err))
  }, [challengeId])

  const handleUpdate = (event) => {
    event.preventDefault()
    axios
      .put(`http://localhost:8080/api/challenge/${challengeId}`, value)
      .then((response) => {
        console.log(response)
        onClose() // Call the onClose function to close the modal after updating
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleInputChange = (e) => {
    const { name, value: inputValue } = e.target
    setValue((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }))
  }

  return (

      <div className="challenge-form-container">
        <form onSubmit={handleUpdate}>
          <label>Challenge Name</label>
          <input
            type="text"
            name="challengeName"
            value={value.challengeName}
            onChange={handleInputChange}
          ></input>
          <label>Challenge Description</label>
          <div className="textarea-container">
            <textarea
              cols={90}
              rows={7}
              name="challengeDescription"
              value={value.challengeDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <label>Challenge Difficulty</label>
          <select
            name="challengeDifficulty"
            value={value.challengeDifficulty}
            onChange={handleInputChange}
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
            name="category"
            value={value.category}
            onChange={handleInputChange}
          ></input>
          <label>Theoretical</label>
          <select
            name="theoretical"
            value={value.theoretical}
            onChange={handleInputChange}
          >
            <option value="">Select if Theoretical</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
          <label>Estimated Time</label>
          <input
            type="text"
            name="estimatedTime"
            value={value.estimatedTime}
            onChange={handleInputChange}
          ></input>
          <button type="submit">Update Challenge</button>
        </form>
      </div>
  )
}

export default EditTable
