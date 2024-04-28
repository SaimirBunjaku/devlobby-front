import React, { useEffect } from 'react'
import './ImgZoomModal.scss'

const ImgZoomModal = ({ modalOpen, setModalOpen, media }) => {
  // prevent screen from scrolling
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [modalOpen])

  // close if ESC pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return
      setModalOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  // TODO: UseRef
  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <>
      {modalOpen && (
        <div className='imgZoomModal'>
          <div className='imgModalContent'>
            <img src={media} alt='Full size' />
            <div onClick={toggleModal} className='imgModalCloseBtn'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M18 6l-12 12' />
                <path d='M6 6l12 12' />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImgZoomModal
