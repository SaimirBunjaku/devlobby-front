import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import './AdminBigChart.scss'; 
import { DarkModeContext } from '../../../utils/DarkModeContext';

const AdminBigChart = () => {
  const [chartData, setChartData] = useState({});
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
        console.log(data);
        setChartData({
          labels: data.map((item) => item.week),
          datasets: [
            {
              label: 'User Registrations',
              data: data.map((item) => item.registrations),
              borderColor: 'rgba(0, 123, 255, 1)', 
              backgroundColor: 'rgba(0, 51, 160, 0.5)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              borderCapStyle: 'round',
              borderJoinStyle: 'round',
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const chartOptions = {
    scales: {
      y: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        },
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000', 
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(2, 12, 15, 0.5)', 
        },
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000', 
        }
      }
    }
  };

  return (
    <div className="admin-big-chart-container">
      <h2 className="admin-big-chart-heading">User Registrations Chart</h2>
      <div className="admin-big-chart">
        {chartData.labels && <Line data={chartData} options={chartOptions} />}
      </div>
    </div>
  );
};

export default AdminBigChart;
