import React, { useState, useEffect, useRef } from 'react'
import { IoIosNotifications } from 'react-icons/io'
import './NotificationBar.scss'

const NotificationBar = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationsRef = useRef(null)

  const handleClick = () => {
    setShowNotifications(!showNotifications)
  }

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className='notificationBar'>
      <div className='notification-container'>
        <div className='bell-icon' onClick={handleClick}>
          <IoIosNotifications />
        </div>
        <div
          className={`notifications ${showNotifications ? 'active' : ''}`}
          ref={notificationsRef}
        >
          <p>Congratulations! You have just passed the first challenge</p>
          <p>Congratulations! You have just passed the second challenge</p>
          <p>Upgrade your profile!</p>
        </div>
      </div>
    </div>
  )
}

export default NotificationBar
