import React, { useContext } from 'react';
import SearchBar from '../../molecules/SearchBar';
import AdminNotificationCenter from '../../molecules/AdminNotificationCenter';
import { DarkModeContext } from "../../../utils/DarkModeContext";
import "./DashboardHeader.scss";

function DashboardHeader() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`dashboard-ribbon ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='dashboard-search-input'>
      <SearchBar />
      </div>
      <h2>Welcome to your Admin Dashboard!</h2>
      <AdminNotificationCenter className="admin-notification" />
    </div>
  );
}

export default DashboardHeader;
