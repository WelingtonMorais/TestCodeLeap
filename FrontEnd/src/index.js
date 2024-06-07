import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import 'core-js'

import App from './App'
import { UserProvider } from '../src/context/UserContext' // Importando o UserProvider
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <UserProvider>
      {' '}
      <HashRouter>
        {' '}
        <App />
      </HashRouter>
    </UserProvider>
  </Provider>,
)
