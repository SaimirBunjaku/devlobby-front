import React, { useState, useEffect } from 'react'
import './AdminChallengeTable.scss'
import { ChallengeService } from '../../../services/ChallengeService'
import ModalBasic from '../../molecules/ModalBasic'
import CreateChallengeForm from '../CreateChallengeForm'
import EditChallengeForm from '../EditChallenge'
import ModalDelete from '../../molecules/ModalDelete'

function AdminChallengeTable() {
  const [challenges, setChallenges] = useState([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedChallengeId, setSelectedChallengeId] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [challengeToDelete, setChallengeToDelete] = useState(null)

  useEffect(() => {
    try {
      ChallengeService.GetChallenges()
        .then((response) => {
          console.log(response)
          setChallenges(response.challenges)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = (id) => {
    // Just open the delete confirmation modal and store the ID to be deleted
    setChallengeToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    // Perform the actual deletion
    ChallengeService.DeleteChallenge(challengeToDelete)
      .then((response) => {
        console.log(response)
        setChallenges(challenges.filter((challenge) => challenge._id !== challengeToDelete))
        // Close the delete confirmation modal
        setIsDeleteModalOpen(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleEdit = (id) => {
    setSelectedChallengeId(id);
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedChallengeId(null);
    // Fetch the updated list of challenges after editing
    ChallengeService.GetChallenges()
      .then((response) => {
        console.log(response);
        setChallenges(response.challenges);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const practicalQuestions = challenges.filter((challenge) => challenge.theoretical === 'False')
  

  return (
    <div className="admin-table-container">
      <h1>Challenges</h1>
      <button
        className="create-challenge-btn"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Create
      </button>
      <ModalBasic
        title="Create Challenge"
        modalOpen={isCreateModalOpen}
        setModalOpen={setIsCreateModalOpen}
      >
        {isCreateModalOpen && <CreateChallengeForm />}
      </ModalBasic>
      <ModalBasic
        title="Editing Challenge "
        modalOpen={isEditModalOpen}
        setModalOpen={setIsEditModalOpen}
      >
        {isEditModalOpen && (
          <EditChallengeForm
            challengeId={selectedChallengeId}
            onClose={handleCloseEditModal}
          />
        )}
      </ModalBasic>
      <table width={{}}>
        <thead>
          <tr>
            <th>Challenge ID</th>
            <th>Challenge Name</th>
            <th>Difficulty</th>
            <th>Theoretical</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {practicalQuestions.map((challenge, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{challenge.challengeName}</td>
                <td>{challenge.challengeDifficulty}</td>
                <td>{challenge.theoretical}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(challenge._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(challenge._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <ModalDelete
        title="Are you sure you want to delete this challenge?"
        modalOpen={isDeleteModalOpen}
        setModalOpen={setIsDeleteModalOpen}
        confirmHandler={confirmDelete}
      />
    </div>
  )
}

export default AdminChallengeTable
