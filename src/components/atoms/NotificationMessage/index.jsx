import React from 'react'
import { TbPoint } from 'react-icons/tb'

const Message = ({ message }) => {
  return (
    <div className='msg-container'>
      <div className='icon'>
        <TbPoint />
      </div>
      <div className='msg'>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Message
