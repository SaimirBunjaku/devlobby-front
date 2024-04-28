import React, { useEffect, useState, useContext } from 'react';
import { DarkModeContext } from '../../../utils/DarkModeContext'; 
import './UserStats.scss';

const UserStats = () => {
  const [userData, setUserData] = useState({ totalUsers: 0, usersGained: 0, growthPercentage: 0 });
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    fetch('http://localhost:8080/api/user/getWeeklyRegistrations')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const totalUsers = data.reduce((acc, weekData) => acc + weekData.registrations, 0);
        const usersGained = data[data.length - 1].registrations;
        const growthPercentage = ((usersGained / (data[data.length - 2]?.registrations || 1)) * 100).toFixed(2);
        setUserData({ totalUsers, usersGained, growthPercentage });
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []); 

    const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.8)';

    return (
      <div className='user-stats'>
        <div className='user-stats-card' style={{ color: textColor }}>
          <h3>Total Users</h3>
          <p>{userData.totalUsers}</p>
        </div>
        <div className='user-stats-card' style={{ color: textColor }}>
          <h3>Users Gained This Week</h3>
          <p>{userData.usersGained}</p>
        </div>
        <div className='user-stats-card' style={{ color: textColor }}>
          <h3>Weekly Growth Percentage</h3>
          <p>{userData.growthPercentage}%</p>
        </div>
      </div>
    );
  };
  
  export default UserStats;