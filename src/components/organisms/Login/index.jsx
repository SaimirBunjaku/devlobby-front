import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthService } from '../../../services/AuthService'
import './Login.scss'
import Logo from '../../../assets/images/icon.png'
import LoginImage from '../../../assets/images/Signup-image.png'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../utils/AuthContext'
import { Link } from 'react-router-dom'

const Login = () => {
  const [loginCreds, setLoginCreds] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [verifiedMessage, setVerifiedMessage] = useState('')
  const { login, isLoggedIn } = useContext(AuthContext)
  const emailRef = useRef(null)
  const passRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  useEffect(() => {
    document.addEventListener('mousedown', handleFocusChange)
    return () => {
      document.removeEventListener('mousedown', handleFocusChange)
    }
  })

  const handleFocusChange = e => {
    if (emailRef.current && !emailRef.current.contains(e.target)) {
      loginCreds.email.length && validEmail(loginCreds.email)
    }
  }

  function validEmail (email) {
    const pattern =
      // eslint-disable-next-line
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
    const result = pattern.test(email)
    if (result !== true) {
      setError('Not a valid email format')
      return false
    } else {
      setError('')
      return true
    }
  }

  function validPassword (password) {
    if (password.length < 8) {
      setError('Password too short.')
      return false
    } else {
      setError('')
      return true
    }
  }

  const handleLogin = async e => {
    e.preventDefault()

    if (!validEmail(loginCreds.email) || !validPassword(loginCreds.password)) {
      return
    }

    try {
      const response = await AuthService.login(loginCreds)
      if (response === 'Failed to fetch' || response.error) {
        console.log('1')
        setError(response?.error)
        return
      } else if (!response?.user?.verified) {
        console.log('user not verified', response.user.verified)
        setVerifiedMessage(response.message)
        return
      } else {
        console.log('3')
        setError('')
      }
      login(response?.token)
    } catch (error) {
      setError('Failed to login. Please try again.')
    }
  }

  const handleChange = e => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='login-container'>
        <form className='login-form'>
          <h2>Login</h2>

          <img src={Logo} alt='Logo' className='devlobby-logo' />
          <p>See your growth and get consulting support!</p>
          <div className='divider'>
            <hr />
            Log in with email <hr />
          </div>
          {error && <div className='error-message'>{error}</div>}
          <div className='login-input-form'>
            <input
              ref={emailRef}
              type='email'
              placeholder='Email'
              name='email'
              required
              value={loginCreds?.email}
              onChange={handleChange}
            />
            <input
              ref={passRef}
              type='password'
              placeholder='Password'
              name='password'
              minLength='8'
              required
              value={loginCreds?.password}
              onChange={handleChange}
            />
            {verifiedMessage && (
              <div className='verificationMessage'>{verifiedMessage}</div>
            )}
            <button onClick={handleLogin} className='login-btn'>
              Login
            </button>
          </div>
          <div className='reset-redirect'>
            Forgot password? <Link to='/login/reset'> Reset password</Link>
          </div>
        </form>
        <div className='login-image-section'>
          <img src={LoginImage} alt='Login' />
        </div>
      </div>
    </>
  )
}

export default Login
