import React, { useState } from 'react'
import './DiaryForm.scss'
import ProfileDefault from '../../../assets/images/icon.png'

const DiaryFrom = ({ postDiary, profilePicture, userId }) => {
  const [text, setText] = useState('')
  const [media, setMedia] = useState(null)
  const [privacy, setPrivacy] = useState(false)

  const handleInputBlur = e => {
    if (text.length) {
      return e.target.focus()
    }
  }

  // Use the replace() method with a regular expression to remove empty newlines
  function removeEmptyNewlines (inputString) {
    const cleanedString = inputString.replace(/\n{3,}/g, '\n\n')
    return cleanedString
  }

  const handleMedia = e => {
    const file = e.target.files[0]
    const reader = new FileReader()

    try {
      reader.readAsDataURL(file)
    } catch (error) {
      console.log(error)
    }

    reader.onload = () => {
      const base64Img = reader.result
      console.log('base64 media set')
      setMedia(base64Img)
    }
  }

  const handlePost = async () => {
    const data = {
      user: userId,
      text: removeEmptyNewlines(text),
      media,
      privacy
    }

    postDiary(data)
    setText('')
    setMedia(null)
  }

  return (
    <div className='diaryForm'>
      <img
        src={profilePicture || ProfileDefault}
        alt='Profile'
        className='profile-img'
      />

      <div className='inputContainer'>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          name='postContent'
          placeholder="What's going on today dev?"
          onBlur={handleInputBlur}
        />

        {media && (
          <div className='mediaContainer'>
            <div
              className='removeMediaBtn'
              onClick={() => {
                setMedia(null)
              }}
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M18 6l-12 12' />
                <path d='M6 6l12 12' />
              </svg>
            </div>
            <img src={media} alt='' />
          </div>
        )}

        <div className='actionContainer'>
          <input
            name='media'
            id='addMedia'
            type='file'
            accept='image/*'
            onChange={handleMedia}
          />

          <label htmlFor='addMedia'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 8h.01' />
              <path d='M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z' />
              <path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5' />
              <path d='M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3' />
            </svg>
          </label>

          <div className='postOptions'>
            <div
              onClick={() => {
                setPrivacy(!privacy)
              }}
              className='privacyBtn'
            >
              {!privacy ? (
                <div className='toggleBtn'>
                  <span>Everyone</span>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='everyone'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                    <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
                  </svg>{' '}
                </div>
              ) : (
                <div className='toggleBtn'>
                  <span>Only Me</span>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='only-me'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M10.585 10.587a2 2 0 0 0 2.829 2.828' />
                    <path d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87' />
                    <path d='M3 3l18 18' />
                  </svg>{' '}
                </div>
              )}
            </div>
            <div onClick={handlePost} className='postBtn'>
              Post
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiaryFrom
