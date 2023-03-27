import React, { useState } from 'react'
import '../styles/loginPage.css'

export const LoginPage = ({ login }) => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-title">To-Do List App</h1>
      </div>

      <div className="login-form">
        <div className="input-field">
          <input
            id="email"
            type="email"
            name="email"
            className="validate"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <label className="label" htmlFor="email">Email</label>
        </div>

        <div className="input-field">
          <input
            id="password"
            type="password"
            name="password"
            className="validate"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <label className="label" htmlFor="password">Password</label>
        </div>

        <div className="buttons">
          <a className="login-link" href="/register">Create an account</a>
          <button
            className="btn login-button waves-effect waves-light"
            name="login"
            onClick={() => {
              if (!email || !password) return

              fetch('api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
                .then(res => {
                  login(res.token, res.userId)

                  if (res.message) {
                    setMessage(res.message)
                  }
                })
            }}
          >
            Log in
          </button>
        </div>
        {
          message &&
          <div className="warning-container">
            <span className="warning-message"><b>{message}</b></span>
          </div>
        }
      </div>
    </div>
  )
}