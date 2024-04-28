import React from 'react';
import AdminBigChart from '../../molecules/AdminBigChart/AdminBigChart';
import UserStats from '../../molecules/AdminBigChart/UserStats';
import './BigChartAndStats.scss'

function BigChartAndStats() {
  return (
    <div className='chart-and-stats'>
      <AdminBigChart />
      <UserStats />
    </div>
  );
}

export default BigChartAndStats;
