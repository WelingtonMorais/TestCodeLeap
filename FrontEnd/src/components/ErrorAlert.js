import React from 'react'
import { CAlert } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ErrorAlert = ({ message }) => {
  return (
    <CAlert color="danger" className="mt-3">
      {message}
    </CAlert>
  )
}

export default ErrorAlert
