import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('')
  const setUserName = (name) => {
    setUsername(name)
  }

  return <UserContext.Provider value={{ username, setUserName }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  return useContext(UserContext)
}
