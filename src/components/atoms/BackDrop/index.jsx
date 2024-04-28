import React from 'react'
import './BackDrop.scss'

const BackDrop = ({ setModalOpen }) => {
  return <div onClick={() => setModalOpen(false)} className='backDrop'></div>
}

export default BackDrop
