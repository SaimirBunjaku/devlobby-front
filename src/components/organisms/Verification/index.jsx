import React, { useEffect, useState } from 'react'
import './Verification.scss'
import { Link, useParams } from 'react-router-dom'
import { AuthService } from '../../../services/AuthService'

const Verification = () => {
  const [validUrl, setValidUrl] = useState()
  const [loading, setLoading] = useState(false)
  const param = useParams()

  useEffect(() => {
    const verifyEmailUrl = async () => {
      setLoading(true)
      try {
        const response = await AuthService.verifySignup(param.id, param.token)
        setValidUrl(response.success)
      } catch (error) {
        setValidUrl(false)
      }
      setLoading(false)
    }
    verifyEmailUrl()
  }, [param])

  return loading ? (
    <h3>Loading...</h3>
  ) : validUrl ? (
    <div className='verification'>
      <div className='container'>
        <div id='success'>Verification successful ✅</div>
        <div className='text2'>You are now a member of our community 💖</div>
        <div className='guide'>
          <Link to='/login'>
            <div className='homeBtn'>Click to login</div>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className='verification'>
      <div className='container'>
        <div id='success'>Verification link dead 💀</div>
        <div className='text2'>Please check your verification link, or get a new one.</div>
        <div className='guide'>
          <Link to='/'>
            <div className='homeBtn'>Go back to Lobby</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Verification
