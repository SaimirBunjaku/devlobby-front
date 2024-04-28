// Client-side
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const SmallCharts = ({ title, dataKey, lineColor, bgColor }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    let url;
    if (dataKey === 'getDailyChallenges') {
      url = `http://localhost:8080/api/challenge/${dataKey}`;
    } else {
      url = `http://localhost:8080/api/user/${dataKey}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const chartData = {
          labels: data.map(item => item.date),
          datasets: [
            {
              label: title,
              data: data.map(item => item[dataKey]),
              borderColor: lineColor,
              backgroundColor: bgColor,
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              borderCapStyle: 'round',
              borderJoinStyle: 'round',
            },
          ],
        };
        setChartData(chartData);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [title, dataKey, lineColor, bgColor]);

  return (
    <div className="user-activity-chart">
      <h2>{title}</h2>
      <Line data={chartData} />
    </div>
  );
};

export default SmallCharts;
