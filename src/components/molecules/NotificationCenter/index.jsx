import React, { useState, useRef, useEffect } from 'react'
import { FaBell } from 'react-icons/fa'
import NotificationMessage from '../../atoms/NotificationMessage'
import './NotificationCenter.scss'

const NotificationCenter = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)

  // Close on click outside
  useEffect(() => {
    function handleClickOutside (event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false)
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
      if (!showNotifications || keyCode !== 27) return
      setShowNotifications(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <div className='notificationCenter'>
      <div className='unread'>{notifications?.length}</div>
      <div
        className={`bell-button ${showNotifications && 'bell-active'}`}
        ref={notificationRef}
        onClick={handleNotificationClick}
      >
        <FaBell />
      </div>
      {showNotifications && (
        <div className='notification-container'>
          {notifications.map((item, i) => {
            return <NotificationMessage message={item.message} key={i} />
          })}
        </div>
      )}
    </div>
  )
}

export default NotificationCenter
