import React from 'react'
import './UserSearchRow.scss'

const UserSearchRow = ({ id, name, username }) => {
  return (
    <div className='userSearchRow'>
      <div className='userContainer'>
        <div className='username'>
          <div className='actionBtn'>
            <svg
              className='action'
              width='18'
              height='18'
              viewBox='0 0 28 22'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path
                d='M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z'
                strokeWidth='0'
                fill='currentColor'
              />
            </svg>
          </div>
          {username}
        </div>
        <div className='inviteBtn'>
          <svg
            width='26'
            height='26'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 5h3.5a5 5 0 0 1 0 10h-5.5l-4.015 4.227a2.3 2.3 0 0 1 -3.923 -2.035l1.634 -8.173a5 5 0 0 1 4.904 -4.019h3.4z' />
            <path d='M14 15l4.07 4.284a2.3 2.3 0 0 0 3.925 -2.023l-1.6 -8.232' />
            <path d='M8 9v2' />
            <path d='M7 10h2' />
            <path d='M14 10h2' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default UserSearchRow
