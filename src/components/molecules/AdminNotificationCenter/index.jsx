import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaBell } from "react-icons/fa";
import { DarkModeContext } from "../../../utils/DarkModeContext";
import "./AdminNotificationCenter.scss";

const AdminNotificationCenter = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const { isDarkMode } = useContext(DarkModeContext);


  //making notif center disappear when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className={`notification-center ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <button className="notification-icon" onClick={handleNotificationClick}>
        <FaBell />
      </button>
      {showNotifications && (
        <div className="notifications" ref={notificationRef}>
          <p>No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationCenter;
