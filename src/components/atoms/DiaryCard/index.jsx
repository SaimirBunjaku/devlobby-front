import React, { useState, useContext, useEffect } from 'react'
import ImgZoomModal from '../../atoms/ImgZoomModal'
import './DiaryCard.scss'
import ProfileTemp from '../../../assets/images/icon.png'
import OptionsDropdown from '../DiaryOptionsDropdown'
import { AuthContext } from '../../../utils/AuthContext'
import DeleteModalZoom from '../DeleteModalZoom'

const DiaryCard = ({
  id,
  userId,
  fullName,
  username,
  text,
  profilePicture,
  postedAgo,
  upvotes,
  upvoteCount,
  media,
  privacy,
  deleteDiary,
  togglePrivacy,
  handleUpvote
}) => {
  const [imgModalOpen, setImgModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [upvoted, setUpvoted] = useState(false)
  const { userData } = useContext(AuthContext)
  const currentUser = userData?.userId

  // set initial number of upvotes
  useEffect(() => {
    const checkUpvoted = () => {
      const index = upvotes.indexOf(userData?.userId)

      if (index !== -1) {
        setUpvoted(false)
      } else {
        setUpvoted(true)
      }
    }
    checkUpvoted()
  })

  const triggerDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen)
  }

  // handlePrivacyToggle inverts the value of isPrivate
  const handlePrivacyToggle = async () => {
    togglePrivacy(id, !privacy)
  }

  const handleDelete = async () => {
    deleteDiary(id)
  }

  return (
    <>
      <DeleteModalZoom
        title={'Delete diary?'}
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        confirmHandler={handleDelete}
      >
        This can't be undone and it will be removed from your profile
      </DeleteModalZoom>
      <div className='diaryCard'>
        <div className='left'>
          <img
            src={profilePicture || ProfileTemp}
            alt='Profile'
            className='profile-img'
          />
        </div>
        <div className='optionsBtnContainer'>
          {currentUser === userId && (
            <OptionsDropdown
              togglePrivacy={handlePrivacyToggle}
              handleDelete={triggerDeleteModal}
            />
          )}
        </div>
        <div className='middle'>
          <div className='cardHeader'>
            <div className='headerInfo'>
              {!!fullName && <div className='fullname'>{fullName}</div>}
              <div className='username'>{'@' + username}</div>

              <div className='privacyInfo'>
                {privacy === true ? (
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M10.585 10.587a2 2 0 0 0 2.829 2.828' />
                    <path d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87' />
                    <path d='M3 3l18 18' />
                  </svg>
                ) : (
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                    <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
                  </svg>
                )}
              </div>
              <div className='dateOfCreation'>{postedAgo}</div>
            </div>
          </div>
          <div className='cardBody'>
            <div className='text'>
              {text?.split('\n').map((item, i) => {
                return (
                  <span key={i}>
                    {item}
                    <br />
                  </span>
                )
              })}
            </div>
            {media && (
              <div className='imageContainer'>
                <img
                  className='media-img'
                  onClick={() => setImgModalOpen(true)}
                  src={media}
                  alt='Diary media'
                />
              </div>
            )}
          </div>
          <div className='cardFooter'>
            <div onClick={() => handleUpvote(id)} className='upvoteContainer'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill={`${!upvoted ? 'currentColor' : 'none'}`}
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={`heart ${!upvoted ? 'upVoted' : ''}`}
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
              </svg>
              <span className='count'>{upvoteCount}</span>
            </div>
          </div>
        </div>
        <div className='right'>
          {currentUser === userId && (
            <OptionsDropdown
              togglePrivacy={handlePrivacyToggle}
              handleDelete={triggerDeleteModal}
            />
          )}
        </div>
      </div>

      {media && (
        <ImgZoomModal
          modalOpen={imgModalOpen}
          setModalOpen={setImgModalOpen}
          media={media}
        />
      )}
    </>
  )
}

export default DiaryCard
