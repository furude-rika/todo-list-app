import React, { useState } from 'react';
import '../styles/settingsPage.css'

export const SettingsPage = ({ token, logout }) => {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const cleanUpData = () => {
    setPassword('')
  }

  return (
    <div className="settings-container">
      <div className="settings-form">
        <h1 className="settings-title">Change your password</h1>

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
          <a className="main-link" href="/main">Go to main page</a>
          <button
            className="btn save-button waves-effect waves-light"
            name="save"
            onClick={() => {
              fetch('api/settings/change', {
                method: 'PATCH',
                body: JSON.stringify({ password }),
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
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
            SAVE
          </button>
        </div>
        {
          message &&
          <div className="warning-container">
            <span className="warning-message"><b>{message}</b></span>
          </div>
        }
      </div>
      <div className="settings-delete">
        <p className="delete-title">Delete your account</p>

        <button
          className="btn delete-button waves-effect red"
          name="delete"
          onClick={() => {
            fetch('api/settings/delete', {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            logout()
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  )
}