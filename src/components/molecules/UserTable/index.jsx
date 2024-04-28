import React, { useState, useEffect } from 'react'
import {
  FaSortAmountUp,
  FaSortAmountDown,
  FaEdit,
  FaSearch,
} from 'react-icons/fa'
import { MdDeleteForever, MdVerified, MdDoNotDisturb } from 'react-icons/md'
import './UserTable.scss'
import ModalDelete from '../ModalDelete/index'
import ModalBasic from '../ModalBasic/index'
import Pagination from '../../atoms/Pagination'

const UserTable = () => {
  const itemsPerPage = 6
  const [users, setUsers] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortDirection, setSortDirection] = useState('desc')
  const [selectedUser, setSelectedUser] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleEdit = (user) => {
    setSelectedUser(user)
    setModalOpen(true)
  }

  const handleSave = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${selectedUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedUser),
        },
      )
      if (response.ok) {
        // Assuming fetchData is a function to refresh the user list
        fetchData()
        setModalOpen(false)
      } else {
        // Handle errors
        console.error('Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    // For boolean fields, we need to convert the string value to a boolean
    const newValue =
      name === 'isAdmin' || name === 'verified' ? value === 'true' : value
    // For the dateOfBirth field, we need to ensure the value is a Date object
    const finalValue = name === 'dateOfBirth' ? new Date(value) : newValue
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: finalValue,
    }))
  }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      // Sorting data by createdAt field
      const sortedData = data.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB - dateA
      })
      setUsers(sortedData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async () => {
    console.log('Deleting user with ID:', selectedUserId)
    try {
      await fetch(`http://localhost:8080/api/user/${selectedUserId}`, {
        method: 'DELETE',
      })
      fetchData()
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleSort = () => {
    const sortedData = [...users].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      if (sortDirection === 'desc') {
        return dateB - dateA
      } else {
        return dateA - dateB
      }
    })
    setUsers(sortedData.reverse())
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    setCurrentPage(1) // Reset to the first page when a new search is performed
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString() // Adjust the formatting as needed
  }

  return (
    <main className="main-table">
      <div className="table__body">
        <div className="table__header">
          <h3>All Users</h3>
          <div className="controls">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <button className="sort" onClick={handleSort}>
              {sortDirection === 'asc' ? (
                <FaSortAmountUp />
              ) : (
                <FaSortAmountDown />
              )}{' '}
              Sort
            </button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>Date Created</th>
              <th>Date Updated</th>
              <th>Role</th>
              <th>Verified</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.updatedAt)}</td>
                <td>{user.isAdmin ? 'Admin' : 'Regular'}</td>
                <td style={{ textAlign: 'center', fontSize: '24px' }}>
                  {user.verified ? (
                    <MdVerified style={{ color: 'green' }} />
                  ) : (
                    <MdDoNotDisturb style={{ color: 'red' }} />
                  )}
                </td>

                <td>
                  <button className="editIcon" onClick={() => handleEdit(user)}>
                    <FaEdit />
                  </button>
                  <button
                    className="deleteIcon"
                    onClick={() => {
                      setSelectedUserId(user._id)
                      setShowDeleteModal(true)
                    }}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
          onPageChange={paginate}
        />
      </div>

      <ModalDelete
        modalOpen={showDeleteModal}
        setModalOpen={setShowDeleteModal}
        confirmHandler={handleDelete}
        selectedUserId={selectedUserId}
      >
        Are you sure you want to delete the user with ID:{selectedUserId}?
      </ModalDelete>

      <ModalBasic
        title={`Editing ${selectedUser?.username || 'User'}`}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <form onSubmit={handleSave}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className='usernameEdit'
              id="username"
              name="username"
              defaultValue={selectedUser?.username}
              onChange={handleInputChange}
              minLength="4"
              maxLength="20"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={selectedUser?.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={selectedUser?.password}
              onChange={handleInputChange}
              minLength="8"
              maxLength="64"
              required
            />
          </div>
          <div>
            <label htmlFor="isAdmin">Admin:</label>
            <select
              id="isAdmin"
              name="isAdmin"
              defaultValue={String(selectedUser?.isAdmin)}
              onChange={handleInputChange}
            >
              <option value="false">Regular</option>
              <option value="true">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="verified">Verified:</label>
            <select
              id="verified"
              name="verified"
              defaultValue={String(selectedUser?.verified)}
              onChange={handleInputChange}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button type="submit" className="saveButton">
            Save
          </button>
        </form>
      </ModalBasic>
    </main>
  )
}

export default UserTable
