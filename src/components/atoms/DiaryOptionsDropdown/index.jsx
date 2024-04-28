import React, { useRef, useState, useEffect } from 'react'
import './OptionsDropdown.scss'

const OptionsDropdown = ({ togglePrivacy, handleDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Close on click outside
  useEffect(() => {
    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // Close if ESC pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!showDropdown || keyCode !== 27) return
      setShowDropdown(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  const handleOptionsClick = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <>
      <div
        ref={dropdownRef}
        onClick={handleOptionsClick}
        className='optionsBtn'
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
          <path d='M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
          <path d='M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
          <path d='M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
        </svg>
      </div>
      {showDropdown && (
        <div className='dropdown'>
          <div className='optionContainer'>
            <div onClick={togglePrivacy} className='option privacy'>
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
                <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
              </svg>
              Toggle privacy
            </div>
            <div onClick={handleDelete} className='option delete'>
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
                <path d='M4 7l16 0' />
                <path d='M10 11l0 6' />
                <path d='M14 11l0 6' />
                <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
              </svg>
              Delete
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OptionsDropdown
