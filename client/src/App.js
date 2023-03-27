import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth'
import { NavBar } from './components/navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MainPage } from './components/mainPage'
import { SettingsPage } from './components/settingsPage'
import { LoginPage } from './components/loginPage'
import { RegisterPage } from './components/registerPage'
import 'materialize-css'

function App() {
  const { token, login, logout } = useAuth()

  if (token) {
    return (
      <BrowserRouter>
        <NavBar logout={logout} />
        <div className="container">
          <Routes>
            <Route path='/main' element={<MainPage token={token} />} />
            <Route path='/settings' element={<SettingsPage token={token} logout={logout} />} />
            <Route path='*' element={<Navigate to='/main' />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path='/login' element={<LoginPage login={login} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
