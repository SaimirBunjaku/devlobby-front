import React, { useEffect, useState } from 'react'
import './ModalDelete.scss'
import BackDrop from '../../atoms/BackDrop'

const ModalDelete = ({
  children,
  title = 'Are you sure?',
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
                <div className='title'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='trash'
                    width='18'
                    height='18'
                    viewBox='0 0 26 26'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M4 7l16 0' />
                    <path d='M10 11l0 6' />
                    <path d='M14 11l0 6' />
                    <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
                    <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
                  </svg>
                  <span>{title}</span>
                </div>
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
                  className='deleteBtn'
                  onClick={() => {
                    setModalOpen(false)
                    confirmHandler()
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalDelete
