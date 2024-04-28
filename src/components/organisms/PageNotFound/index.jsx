import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.scss'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
      <div className='container'>
        <div id='errCode'>404 not found :(</div>
        <div className='text2'>This page doesn't exist.</div>
        <div className='text1'>
          The link that brought you here may have been broken 💔
        </div>
        <div className='guide'>
          <Link to='/'>
            <div className='homeBtn'>Go back to Lobby</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
