import React from 'react'
import { Link } from 'react-router-dom'
import './LearnMoreButtonPage.scss'

function LearnMoreButton () {
  return (
    <div className='learnMoreButtonPage'>
      <Link to='/learn-more'>
        <button className='LearnMore-button'>
          Restin' and Testin'{' '}
          <span className='learn-more'> - Learn More →</span>
        </button>
      </Link>
    </div>
  )
}

export default LearnMoreButton
