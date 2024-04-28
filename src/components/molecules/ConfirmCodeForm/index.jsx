import React from 'react'

const ResetPasswordConfirm = ({
  error,
  verificationCode,
  switchStage,
  notFound,
  handleChange,
  onButtonClick
}) => {
  return (
    <div className='reset-form'>
      <div className='divider'>
        <hr />
        We sent you a code <hr />
      </div>
      <p className='message'>
        Check your email to get your confirmation code. If you need to request a
        new code, go back and redo the process.
      </p>
      {error && <div className='error-message'>{error}</div>}
      <div className='email-input'>
        <input
          type='text'
          placeholder='6 digit code'
          name='code'
          value={verificationCode}
          required
          onChange={handleChange}
        />
        <div onClick={() => switchStage(1)} className='code-enter'>
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
        </div>
      </div>
      {!!notFound && <div className='notFoundMessage'>{notFound}</div>}
      <button onClick={onButtonClick} className={`next-btn`}>
        Confirm
      </button>
    </div>
  )
}

export default ResetPasswordConfirm
