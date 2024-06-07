import React, { useState } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const CustomConfirmDeleteModal = ({ visible, title, body, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
    onClose()
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{body}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </CButton>
        <CButton
          color="danger"
          onClick={handleConfirm}
          disabled={loading}
          style={{ color: '#fff' }}
        >
          {loading ? 'Loading...' : 'Delete'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default CustomConfirmDeleteModal
