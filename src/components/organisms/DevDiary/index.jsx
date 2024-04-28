import React, { useContext, useEffect, useState } from 'react'
import './DevDiary.scss'
import DiaryFrom from '../../atoms/DiaryForm'
import DiarySidebar from '../../atoms/DiarySidebar'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../utils/AuthContext'
import { DiaryService } from '../../../services/DiaryService'

const DevDiary = () => {
  const [diaries, setDiaries] = useState(null)
  const [moto, setMoto] = useState('The beginning is always today.')
  const location = useLocation()
  const { userData, isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  // when user isnt logged in take them to login page
  useEffect(() => {
    if (!isLoggedIn) {
      console.log(isLoggedIn)
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (location.pathname === '/diary') {
      getDiaries()
    } else if (location.pathname === '/diary/me') {
      getUserDiaries()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.userId, location.pathname])

  useEffect(() => {
    const motivation = [
      "Every day is a chance to begin again. Don't focus on the failures of yesterday, start today with positive thoughts and expectations.",
      'There are far better things ahead than any we leave behind.',
      'Life is either a daring adventure or nothing at all.',
      "Never regret. If it's good, it's wonderful. If it's bad, it's experience.",
      "In the end, we only regret the chances we didn't take.",
      'The beginning is always today.',
      'A fresh start. A new chapter in life waiting to be written.',
      'Stay away from what might have been, and look at what can be.'
    ]
    const randomIndex = Math.floor(Math.random() * motivation?.length)
    setMoto(motivation[randomIndex])
  }, [])

  const postDiary = async data => {
    console.log(data)
    const res = await DiaryService.postDiary(data)
    if (res?.success) {
      console.log('Post created successfully')
      setDiaries(prev => [res.data, ...prev])
    } else {
      console.log(res.error)
    }
  }

  function getDiaries () {
    DiaryService.getAllDiaries().then(res => {
      if (res?.success) {
        setDiaries(res?.data)
      } else {
        console.log('failed')
      }
    })
  }

  function getUserDiaries () {
    DiaryService.getUserDiaries(userData?.userId).then(res => {
      if (res?.success) {
        setDiaries(res?.data)
      } else {
        console.log('failed')
      }
    })
  }

  const upvoteDiary = async diaryId => {
    const data = { userId: userData?.userId }
    const res = await DiaryService.updateDiaryUpvoteCount(diaryId, data)

    if (res?.success) {
      const updatedDiaries = diaries.map(diary => {
        if (diary._id === diaryId) {
          return {
            ...diary,
            upvotes: res.data.upvotes
          }
        } else {
          return diary
        }
      })
      setDiaries(updatedDiaries)
    }
  }

  const togglePrivacy = async (diaryId, isPrivate) => {
    const data = {
      diaryId: diaryId,
      isPrivate: isPrivate
    }
    const res = await DiaryService.updateDiaryPrivacy(data)
    if (res?.success) {
      console.log(data)
      const updatedDiaries = diaries.map(diary => {
        if (diary._id === diaryId) {
          return {
            ...diary,
            privacy: res.data.privacy
          }
        } else {
          return diary
        }
      })
      setDiaries(updatedDiaries)
    } else {
      console.error(res?.error)
    }
  }

  const deleteDiary = async diaryId => {
    const res = await DiaryService.deleteDiary(diaryId)

    if (res?.success) {
      setDiaries(prev => prev.filter(diary => diary._id !== res.data))
    } else {
      console.error(res.message)
    }
  }

  return (
    <div className='devDiary'>
      <div className='diaryBody'>
        <DiarySidebar
          fullName={userData?.fullName}
          username={userData?.username}
          about={userData?.bio}
          profilePicture={userData?.profilePicture}
        />
        <div className='cardContainer'>
          <div className='diaryNav'>
            <Link to={'/diary'}>
              <div
                className={`menu ${
                  location.pathname === '/diary' ? 'current' : ''
                }`}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
                  <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
                  <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                  <path d='M21 21v-2a4 4 0 0 0 -3 -3.85' />
                </svg>{' '}
                All
              </div>
            </Link>
            <Link to={'me'}>
              <div
                className={`menu ${
                  location.pathname === '/diary/me' ? 'current' : ''
                }`}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z' />
                  <path d='M19 16h-12a2 2 0 0 0 -2 2' />
                  <path d='M9 8h6' />
                </svg>
                Me
              </div>
            </Link>
          </div>
          <DiaryFrom
            postDiary={postDiary}
            profilePicture={userData?.profilePicture}
            userId={userData?.userId}
          />
          <Outlet
            context={[diaries, deleteDiary, upvoteDiary, togglePrivacy, moto]}
          />
        </div>
      </div>
    </div>
  )
}

export default DevDiary
