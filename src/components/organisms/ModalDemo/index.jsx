import React, { useState } from 'react'
import ModalBasic from '../../molecules/ModalBasic'
import ModalConfirm from '../../molecules/ModalConfirm'
import ModalDelete from '../../molecules/ModalDelete'

const ModalDemo = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => {
          setBasicModalOpen(true)
        }}
      >
        Open basic modal
      </button>
      <button
        onClick={() => {
          setConfirmModalOpen(true)
        }}
      >
        Open Confirm modal
      </button>
      <button
        onClick={() => {
          setDeleteModalOpen(true)
        }}
      >
        Open Delete modal
      </button>

      <ModalBasic
        modalOpen={basicModalOpen}
        setModalOpen={setBasicModalOpen}
        title={'Hello Wolrd'}
      >
        This modal is used to inform the user Test text Test text Test text Test
        text Test text Test text Test text Test text Test text Test text Test
        text Test text
      </ModalBasic>

      <ModalConfirm
        modalOpen={confirmModalOpen}
        setModalOpen={setConfirmModalOpen}
        title={'Confirm Something'}
        confirmHandler={() => {
          alert('Confirmed')
        }}
      >
        This modal is used to confirm a selection Test text Test text Test text
        Test text Test text Test text Test text Test text Test text Test text
        Test text Test text
      </ModalConfirm>

      <ModalDelete
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        confirmHandler={() => {
          alert('Deleted')
        }}
      >
        This modal is used to confirm the deletion of an entity Test text Test
        text Test text Test text Test text Test text Test text Test text Test
        text Test text Test text Test text
      </ModalDelete>
    </div>
  )
}

export default ModalDemo
