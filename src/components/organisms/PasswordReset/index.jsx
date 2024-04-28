import React, { useContext, useEffect, useState } from 'react'
import './PasswordReset.scss'
import { AuthService } from '../../../services/AuthService'
import { AuthContext } from '../../../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import ResetPasswordForm from '../../molecules/ResetPasswordForm'
import ConfirmCodeForm from '../../molecules/ConfirmCodeForm'
import NewPasswordForm from '../../molecules/NewPasswordForm'

const PasswordReset = () => {
  const [user, setUser] = useState({ email: '' })
  const [verificationCode, setVerificationCode] = useState('')
  const [stage, setStage] = useState(1)
  const [newPass, setNewPass] = useState({ pass1: '', pass2: '' })

  const [error, setError] = useState('')
  const [notFoundMessage, setNotFoundMessage] = useState('')
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  let requestInProgress = false

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  function resetErrors () {
    setError('')
    setNotFoundMessage('')
  }

  function handleEmailChange (e) {
    resetErrors()
    setUser({ email: e.target.value })
  }

  function handleCodeChange (e) {
    setVerificationCode(e.target.value)
  }

  function handleNewPasswordChange (e) {
    setNewPass({ ...newPass, [e.target.name]: e.target.value })
  }

  function isValidEmail (email) {
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

  function isValidStrongPassword (password) {
    // eslint-disable-next-line
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,36}$/
    const result = pattern.test(password)

    if (password.length < 8) {
      setError('Password too short.')
      return false
    } else if (result !== true) {
      setError(
        'Weak password. Must include at least an uppercase, lowercase, symbol and a number.'
      )
      return false
    } else {
      setError('')
      return true
    }
  }

  const handleCodeRequest = async () => {
    if (requestInProgress) return

    if (user.email.length && isValidEmail(user.email)) {
      // api req to send the 6 digit code to email
      requestInProgress = true

      try {
        const response = await AuthService.reqResetCode(user)
        console.log(response)

        if (!response.success) {
          setNotFoundMessage(response.message)
        } else {
          setUser(response.user)
          switchStage(2)
          setNotFoundMessage(false)
        }
      } catch (err) {
        console.error('Error occurred during API request:', err)
      } finally {
        requestInProgress = false
      }
    }
  }

  const handleCodeVerification = async () => {
    if (requestInProgress) return
    if (!verificationCode) return

    requestInProgress = true
    try {
      const response = await AuthService.verifyResetCode({
        id: user._id,
        code: verificationCode.trim()
      })

      if (!response.success) {
        setNotFoundMessage(response.message)
      } else {
        setNotFoundMessage('')
        switchStage(3)
        console.log('success')
      }
    } catch (err) {
      console.error('Error occured during API req:', err)
    } finally {
      requestInProgress = false
    }
  }

  const handlePasswordChange = async () => {
    if (newPass.pass1) {
      if (newPass.pass1 !== newPass.pass2) {
        setError("Passwords don't match")
        return
      }

      if (isValidStrongPassword(newPass.pass1)) {
        const response = await AuthService.changePassword({
          id: user._id,
          password: newPass.pass1
        })

        if (!response.success) {
          setNotFoundMessage(response.message)
        } else {
          navigate('/login')
          setNotFoundMessage(false)
        }
      }
    }
  }

  const switchStage = value => {
    setStage(value)
    setNotFoundMessage('')
    setVerificationCode('')
  }

  let output

  switch (stage) {
    case 1:
      output = (
        <ResetPasswordForm
          email={user.email}
          handleChange={handleEmailChange}
          error={error}
          setError={setError}
          switchStage={switchStage}
          notFound={notFoundMessage}
          setNotFound={setNotFoundMessage}
          onButtonClick={handleCodeRequest}
        />
      )
      break
    case 2:
      output = (
        <ConfirmCodeForm
          verificationCode={verificationCode}
          handleChange={handleCodeChange}
          error={error}
          setError={setError}
          switchStage={switchStage}
          notFound={notFoundMessage}
          setNotFound={setNotFoundMessage}
          onButtonClick={handleCodeVerification}
        />
      )
      break
    case 3:
      output = (
        <NewPasswordForm
          handleChange={handleNewPasswordChange}
          error={error}
          setError={setError}
          notFound={notFoundMessage}
          setNotFound={setNotFoundMessage}
          onButtonClick={handlePasswordChange}
        />
      )
      break
    default:
      output = (
        <ResetPasswordForm
          email={user.email}
          handleChange={handleEmailChange}
          error={error}
          setError={setError}
          triggerCodeSent={switchStage}
          notFound={notFoundMessage}
          setNotFound={setNotFoundMessage}
          onButtonClick={handleCodeRequest}
        />
      )
      break
  }

  return (
    <>
      <div className='reset-container'>{output}</div>
    </>
  )
}

export default PasswordReset
