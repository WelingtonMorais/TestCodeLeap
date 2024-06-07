import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormLabel,
} from '@coreui/react'

// eslint-disable-next-line react/prop-types
const CustomEditModal = ({ visible, title, onClose, onSave, post }) => {
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedContent, setUpdatedContent] = useState('')

  useEffect(() => {
    if (post) {
      // eslint-disable-next-line react/prop-types
      setUpdatedTitle(post.title)
      // eslint-disable-next-line react/prop-types
      setUpdatedContent(post.content)
    }
  }, [post])

  const handleSave = () => {
    onSave({
      ...post,
      title: updatedTitle,
      content: updatedContent,
    })
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormLabel htmlFor="title">Title</CFormLabel>
        <CFormInput
          type="text"
          id="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <CFormLabel htmlFor="content">Content</CFormLabel>
        <CFormTextarea
          id="content"
          rows={5}
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Save Changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default CustomEditModal
