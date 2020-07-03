import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isLoggedIn } from '../lib/auth'

const NavBar = (props) => {

  function handleLogout() {
    logout()
    props.history.push('/HomePage')
  }

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/" className="button is-light">
              Home
            </Link>

            {!isLoggedIn() && <Link to="/register" className="button is-light">
              Register
            </Link>}


            {!isLoggedIn() && <Link to="/login" className="button is-light">
              Login
            </Link>}

            {isLoggedIn() && <button onClick={handleLogout} className="button is-light">
              Logout
            </button>}

          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default withRouter(NavBar)