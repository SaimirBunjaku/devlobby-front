import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import devLobbylogo from '../../../assets/images/devlobby-logo-cut.png'
import { AuthContext } from '../../../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationCenter from '../NotificationCenter'

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  const [showDropdown, setShowDropdown] = useState(false)
  const { isLoggedIn, logout } = useContext(AuthContext)

  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignupClick = () => {
    navigate('/signup')
  }

  const handleCloseMenuAndRedirect = redirectFunction => {
    return () => {
      closeMenu()
      redirectFunction()
    }
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    window.addEventListener('resize', handleResize)

    const handleOutsideClick = event => {
      if (showDropdown && !event.target.closest('.user-greeting')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showDropdown])

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setShowDropdown(false)
  }

  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/')
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const arrNotifications = [
    { id: 1, message: 'Welcome to dev lobby.' },
    {
      id: 2,
      message: 'User Filan has posted for the first time after a while'
    },
    { id: 3, message: "You've got a new friend request." },
    {
      id: 4,
      message:
        'Shpat Spahiu sent you a friend request! And also went on to tell a story about a picnic he was in.'
    },
    { id: 5, message: 'Test1' },
    { id: 6, message: 'Test2' },
    { id: 7, message: 'Test3' },
    { id: 8, message: 'Test4' },
    { id: 9, message: 'Test5' },
    { id: 10, message: 'Test6' }
  ]

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      {(!isMenuOpen || !isMobile || !isLoggedIn) && (
        <Link to='/'>
          <div className='navbar-logo'>
            <img src={devLobbylogo} alt='DevLobby Logo' onClick={closeMenu} />
          </div>
        </Link>
      )}
      {isLoggedIn && isMenuOpen && isMobile && (
        <button
          className='navbar-profile-icon user-greeting'
          onClick={toggleDropdown}
        >
          <i className='fas fa-user-circle fa-2x'></i>
          {showDropdown && (
            <div
              className={`dropdown-menu ${
                showDropdown ? 'dropdown-menu-active' : ''
              }`}
            >
              <Link
                to='/profile'
                onClick={closeMenu}
                style={{ borderBottom: '1px solid gray', borderRadius: 0 }}
              >
                Profile
              </Link>
              {/* <Link to='/settings' onClick={closeMenu}>
                Settings
              </Link> */}
            </div>
          )}
        </button>
      )}

      <div
        className='hamburger-menu'
        onClick={toggleMenu}
        role='button'
        tabIndex='0'
      >
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'menu-open' : ''}`}>
        <li onClick={closeMenu}>
          <Link to='/' className='home'>
            Home
          </Link>
        </li>
        <li onClick={closeMenu}>
          <Link to='/playcodearena' className='playcodearena'>
            PlayCode Arena
          </Link>
        </li>
        {isLoggedIn && (
          <li onClick={closeMenu}>
            <Link to='/chat'>Chat</Link>
          </li>
        )}
        {isLoggedIn && (
          <li onClick={closeMenu}>
            <Link to='/diary'>Diary</Link>
          </li>
        )}
        <li onClick={closeMenu}>
          <Link to='/blog'>Blog</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to='/about'>About</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to='/contactus'>Contact Us</Link>
        </li>
        {!isLoggedIn && (
          <div
            className={`buttons-container ${isMenuOpen ? 'menu-active' : ''}`}
          >
            <button className='butonat-nav login' onClick={closeMenu}>
              <Link to='/login'>Log in</Link>
            </button>
            <button className='butonat-nav signup' onClick={closeMenu}>
              <Link to='/signup'>Sign Up</Link>
            </button>
          </div>
        )}
        {isLoggedIn && (
          <li className='navbar-logout' onClick={handleLogout}>
            Sign Out
          </li>
        )}
      </ul>
      <div className='butonat-client'>
        {!isLoggedIn ? (
          <>
            <button
              className='login'
              onClick={handleCloseMenuAndRedirect(handleLoginClick)}
            >
              Log in
            </button>
            <button
              className='signup'
              onClick={handleCloseMenuAndRedirect(handleSignupClick)}
            >
              Sign Up
            </button>
          </>
        ) : (
          <NotificationCenter notifications={arrNotifications} />
        )}
        {isLoggedIn && (
          <>
            <div
              className={`user-greeting ${showDropdown ? 'showDropdown' : ''}`}
            >
              <button onClick={toggleDropdown} className='profile'>
                <i className='fas fa-user-circle fa-2x'></i>
              </button>
              {showDropdown && (
                <div
                  className={`dropdown-menu ${
                    showDropdown ? 'dropdown-menu-active' : ''
                  }`}
                >
                  <Link to='/profile' onClick={closeMenu}>
                    Profile
                  </Link>
                  {/* <Link to='/settings' onClick={closeMenu}>
                    Settings
                  </Link> */}
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
