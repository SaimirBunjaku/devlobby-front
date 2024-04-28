import React, { useState } from 'react'
import axios from 'axios'
import './Newsletter.scss'
import NewsPaperImage from '../../../assets/images/newspaperimage-removebg.png'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:8080/api/newsletter/subscribe',
        { email },
      )
      console.log(response.data.message)
      setMessage('Thank you for subscribing!')
      setEmail('')
    } catch (error) {
      if (error.response) {
        console.error('Subscription error:', error.response.data.error)
        setMessage('Failed to subscribe. ' + error.response.data.message)
      } else {
        console.error('Subscription network error:', error)
        setMessage('Failed to subscribe. Please check your network.')
      }
    }
  }

  return (
    <>
      <br />
      <div className="newsletter">
        <div className="newsletter-image">
          <img src={NewsPaperImage} alt="Newspaper" />
        </div>
        <div className="newsletter-content">
          <h2>
            Subscribe to our newsletter to get updates to our latest collections
          </h2>
          <p>
            Get 20% off on your first order just by subscribing to our
            newsletter
          </p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </div>
          </form>
          {message && <div className="newsletter-message">{message}</div>}{' '}
          <small>
            You will be able to unsubscribe at any time.
            <br />
            Read our privacy policy <a href="/privacy-policy">here</a>.
          </small>
        </div>
      </div>
    </>
  )
}

export default Newsletter
