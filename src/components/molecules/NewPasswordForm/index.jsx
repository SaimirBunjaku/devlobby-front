import React from 'react'

const NewPasswordForm = ({
  error,
  verificationCode,
  notFound,
  handleChange,
  onButtonClick
}) => {
  return (
    <div className='reset-form'>
      <div className='divider'>
        <hr />
        Choose a new password <hr />
      </div>
      <p className='message'>
        Make sure your new password is 8 characters or more. Try including
        letters, numbers, and punctuation marks for a strong password.
      </p>
      {error && <div className='error-message'>{error}</div>}
      <div className='email-input'>
        <input
          type='password'
          placeholder='Enter a new password'
          name='pass1'
          value={verificationCode}
          required
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Confirm your password'
          name='pass2'
          value={verificationCode}
          required
          onChange={handleChange}
        />
        {/* <div onClick={triggerCodeSent} className='code-enter'>
          <span>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon-tabler-arrow-left'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M5 12l14 0' />
              <path d='M5 12l6 6' />
              <path d='M5 12l6 -6' />
            </svg>
          </span>
          Don't have a code?
        </div> */}
      </div>
      {!!notFound && <div className='notFoundMessage'>{notFound}</div>}
      <button onClick={onButtonClick} className={`next-btn`}>
        Change password
      </button>
    </div>
  )
}

export default NewPasswordForm
