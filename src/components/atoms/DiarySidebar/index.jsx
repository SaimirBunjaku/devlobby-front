import React from 'react'
import DefaultProfile from '../../../assets/images/icon.png'
import './DiarySidebar.scss'

const Contacts = ({ fullName, username, about, profilePicture }) => {
  return (
    <div className='diarySidebar'>
      <aside>
        <div className='userContainer'>
          <img
            src={profilePicture || DefaultProfile}
            alt='Profile'
            className='profile-img'
          />

          <div className='fullName'>
            {fullName?.length ? fullName : '@' + username}
          </div>
          {fullName?.length && <div className='username'>@{username}</div>}
          <div className='about'>{about}</div>
        </div>
        {/* <div className='friendsContainer'>Friends</div> */}
      </aside>
    </div>
  )
}

export default Contacts
