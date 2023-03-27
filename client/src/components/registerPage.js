import React, { useState } from 'react'
import '../styles/registerPage.css'

export const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const cleanUpData = () => {
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="login-container">
      <div className="register-header">
        <h1 className="register-title">To-Do List App</h1>
      </div>

      <div className="register-form">
        <div className="input-field">
          <input
            id="rname"
            type="text"
            name="rname"
            className="validate"
            required
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <label htmlFor="rname">Name</label>
        </div>

        <div className="input-field">
          <input
            id="remail"
            type="email"
            name="email"
            className="validate"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <label htmlFor="remail">Email</label>
        </div>

        <div className="input-field">
          <input
            id="rpassword"
            type="password"
            name="rpassword"
            className="validate"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <label htmlFor="rpassword">Password</label>
        </div>

        <div className="buttons">
          <a className="login-link" href="/login">Log in</a>

          <button
            className="btn waves-effect waves-light register-button"
            type="submit"
            onClick={() => {
              fetch('api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
                .then(res => {
                  if (res.message) {
                    setMessage(res.message)
                  }
                })
              cleanUpData()
            }}
          >
            Register
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