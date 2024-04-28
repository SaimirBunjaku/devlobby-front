import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../utils/AuthContext'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { DarkModeContext } from '../../../utils/DarkModeContext' // Import DarkModeContext
import './LayoutAdmin.scss'
import SearchBar from '../../molecules/SearchBar'
import Logo from '../../../assets/images/icon.png'
import { FaChartPie, FaUsers, FaMoon, FaSun } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { TbDoorExit } from 'react-icons/tb'
import { FaGamepad } from "react-icons/fa";
import AdminForm from '../../organisms/AdminForm'

const AdminLayout = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext) // Use DarkModeContext
  const { token, logout, isAdmin } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isAdmin]);

  // if loading ose isAdmin osht false kthehemi ne admin forme.
  if (loading || !isAdmin) {
    return <AdminForm />;
  }
  return (
    <>
        {/*Sidebar and Header*/}
        <div className='adminLayout'>
          <div className='container'>
            <div className={isDarkMode ? 'header header-dark' : 'header'}>
              <div className='left'>
                <div className='title'>DevLobby Admin Dashboard</div>
              </div>

              <div className='right'>
                <div className='search'>
                  {/* <SearchBar /> */}
                </div>
              </div>
            </div>
            <div class={isDarkMode ? 'sidebar sidebar-dark' : 'sidebar'}>
              <div className='top'>
                <Link to='/'>
                  <div class='logo'>
                    <img src={Logo} width={140} alt='' />
                  </div>
                </Link>

                <div class='links'>
                  <ul className={isDarkMode ? 'dark-mode' : ''}>
                    <Link to='/admin'>
                      <li>
                        <FaChartPie />
                        Overview
                      </li>
                    </Link>
                    <Link to='/admin/users'>
                      <li>
                        <FaUsers />
                        Users
                      </li>
                    </Link>
                    <Link to='/admin/challenges'>
                      <li>
                        <FaGamepad />
                        Challenges
                      </li>
                    </Link>
                    <Link to='/admin/settings'>
                      <li>
                        <IoMdSettings />
                        Settings
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>

              <div className='bottom'>
                <div onClick={logout} class='logout-button'>
                  <TbDoorExit />
                  Logout
                </div>
                <div>
                  <button
                    onClick={toggleDarkMode}
                    className={
                      !isDarkMode
                        ? 'darkmode-button'
                        : 'darkmode-button darkmode-light'
                    }
                  >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                  </button>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT (WITHIN ADMIN LAYOUT) */}
            <div className={isDarkMode ? 'main main-dark' : 'main'}>
              <Outlet />
            </div>
          </div>
        </div>
    </>
  )
}

export default AdminLayout
