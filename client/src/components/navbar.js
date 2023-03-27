import React from 'react'

export const NavBar = ({ logout }) => {
  return (
    <nav>
      <div className="nav-wrapper header">
        <a
          href="/"
          style={{ "paddingLeft": "15px" }}
          className="brand-logo left"
        >
          Todo-List App
        </a>

        <ul id="nav-mobile" className="right">
          <li>
            <a style={{ "color": "#26a69a" }} href="/settings">Settings</a>
          </li>
          <li>
            <a style={{ "color": "#26a69a" }} href="/logout" onClick={() => logout()}>Log out</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}