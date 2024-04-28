import React, { useContext, useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.scss";
import { DarkModeContext } from "../../../utils/DarkModeContext"; // Update the path according to your project structure
import { AuthContext } from "../../../utils/AuthContext"; 
import { TbDoorExit } from "react-icons/tb";

import DashboardHeader from '../../organisms/DashboardHeader'

const Sidebar = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { logout } = useContext(AuthContext); 

  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) { 
        setSidebar(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={isDarkMode ? "sidebar dark-mode" : "sidebar light-mode"}>
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <DashboardHeader />
      </div>
      <div className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
        <ul className="sidebar-menu-items">
          <li className="sidebar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
          </li>

          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <div className="dark-mode-button-container">
            <button onClick={(event) => toggleDarkMode(event)}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <button className="logout-button" onClick={logout}><TbDoorExit />Logout</button>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;