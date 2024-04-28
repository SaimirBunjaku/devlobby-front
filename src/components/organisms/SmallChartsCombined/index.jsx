import React, { useState, useEffect, useContext } from 'react';
import Chart from '../../molecules/AdminSmallCharts/index';
import { DarkModeContext } from '../../../utils/DarkModeContext';
import './SmallChartsCombined.scss';

const SmallChartsCombined = () => {
  const [loginsData, setLoginsData] = useState([]);
  const [challengesData, setChallengesData] = useState([]);
  const [feedbacksData, setFeedbacksData] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
  const fetchData = async (dataKey, setData) => {
    let url;
    if (dataKey === 'getDailyChallenges') {
      url = `http://localhost:8080/api/challenge/${dataKey}`;
    } else {
      url = `http://localhost:8080/api/user/${dataKey}`;
    }

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setData(data);
  };

  fetchData('getDailyLogins', setLoginsData);
  fetchData('getDailyChallenges', setChallengesData);
  fetchData('getDailyFeedbacks', setFeedbacksData);

  console.log(feedbacksData);
}, []);


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      },
      ticks: {
        color: isDarkMode ? '#ffffff' : '#000000',
      },
    },
    x: {
      grid: {
        color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      },
      ticks: {
        color: isDarkMode ? '#ffffff' : '#000000',
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: isDarkMode ? '#ffffff' : '#000000',
      },
    },
  },
};

return (
  <div className='charts-container'>
    <Chart 
      data={loginsData} 
      dataKey="logins" 
      title="User Logins" 
      lineColor="255, 99, 132" 
      fillColor="255, 99, 132" 
      options={chartOptions}
    />
    <Chart 
      data={challengesData} 
      dataKey="challenges" 
      title="Challenges Complete" 
      lineColor="255, 159, 64" 
      fillColor="255, 159, 64" 
      options={chartOptions}
    />
    <Chart 
      data={feedbacksData} 
      dataKey="feedbacks" 
      title="User Feedback" 
      lineColor="75, 192, 192" 
      fillColor="75, 192, 192" 
      options={chartOptions}
    />
  </div>
);
};

export default SmallChartsCombined;
