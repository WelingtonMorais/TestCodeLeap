import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { useUser } from '../../../context/UserContext'
import ErrorAlert from '../../../components/ErrorAlert'

const Login = () => {
  const { username, setUserName } = useUser()
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleLogin = () => {
    setUserName(username)
    setLoginSuccess(true)
  }

  if (loginSuccess) {
    return <Navigate to="/register" />
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Welcome to CodeLeap Network!</h1>
                    <p className="text-body-secondary">Please enter your username</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow className="justify-content-end">
                      <CCol xs={6} className="d-flex justify-content-end">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleLogin}
                          disabled={!username}
                        >
                          Enter
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
