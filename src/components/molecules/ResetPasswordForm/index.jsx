import React from 'react'

const ResetPasswordForm = ({
  email,
  notFound,
  switchStage,
  error,
  handleChange,
  onButtonClick
}) => {
  return (
    <div className='reset-form'>
      <div className='divider'>
        <hr />
        Find your DevLobby account <hr />
      </div>
      <p className='message'>
        Enter the email associated with your account to change your password.
      </p>
      {error && <div className='error-message'>{error}</div>}
      <div className='email-input'>
        <input
          type='text'
          placeholder='Email'
          name='email'
          required
          value={email}
          onChange={handleChange}
        />
      </div>
      <div onClick={() => switchStage(2)} className='code-enter'>
        Already have the code?{' '}
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
            className='icon icon-tabler icons-tabler-outline icon-tabler-arrow-right'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12l14 0' />
            <path d='M13 18l6 -6' />
            <path d='M13 6l6 6' />
          </svg>
        </span>
      </div>
      {!!notFound && <div className='notFoundMessage'>{notFound}</div>}
      <button
        onClick={() => {
          onButtonClick()
        }}
        className={'next-btn'}
      >
        Next
      </button>
    </div>
  )
}

export default ResetPasswordForm
