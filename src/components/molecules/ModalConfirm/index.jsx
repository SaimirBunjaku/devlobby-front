import React, { useEffect, useState } from 'react'
import './ModalConfirm.scss'
import BackDrop from '../../atoms/BackDrop'

const ModalConfirm = ({
  children,
  title = 'Confirm',
  modalOpen,
  setModalOpen,
  confirmHandler
}) => {
  const [renderModal, setRenderModal] = useState(modalOpen)
  // prevent screen from scrolling
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
      // After a brief delay, set renderModal to true
      const timeoutId = setTimeout(() => {
        setRenderModal(true)
      }, 0) // Adjust this delay as needed
      return () => clearTimeout(timeoutId)
    } else {
      document.body.style.overflow = 'unset'
      // Set renderModal to false immediately when modal is closed
      setRenderModal(false)
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

  return (
    <>
      {modalOpen && (
        <div className='modalConfirm'>
          <BackDrop setModalOpen={setModalOpen} />
          <div className='modalBackground'>
            <div className={`modalContainer${renderModal ? ' show' : ''}`}>
              <div className='modalHeader'>
                <div className='title'>{title}</div>
                <div
                  onClick={() => {
                    setModalOpen(false)
                  }}
                  className='closeBtn'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className=''
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M18 6l-12 12' />
                    <path d='M6 6l12 12' />
                  </svg>
                </div>
              </div>
              <div className='body'>{children}</div>
              <div className='modalFooter'>
                <button
                  className='cancelBtn'
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className='confirmBtn'
                  onClick={() => {
                    setModalOpen(false)
                    confirmHandler()
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalConfirm
