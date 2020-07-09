import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isLoggedIn } from '../lib/auth'

const NavBar = (props) => {

  function handleLogout() {
    logout()
    props.history.push('/')
  }

  return <nav className="navbar-menu">
    <div className="navbar-container-left">
      <Link to="/" className="navbar-link">
        Home
      </Link>

      <Link to="/latest" className="navbar-link">
        Latest
      </Link>

      <Link to="/women" className="navbar-link">
        Women
      </Link>

      {isLoggedIn() && <Link to="/profile" className="navbar-link">
        Favourites
      </Link>}

      {isLoggedIn() && <Link to='/reviews' className="navbar-link">
        Reviews
      </Link>}
    </div>

    <div className="navbar-container-right">
      {!isLoggedIn() && <Link to="/register" className="navbar-link">
        Register
      </Link>}

      {!isLoggedIn() && <Link to="/login" className="navbar-link">
        Login
      </Link>}

      {isLoggedIn() && <button onClick={handleLogout} id="navbar-button" className="navbar-link">
        <span className="noselect">Logout</span>
        <div id="circle"></div>
      </button>}
    </div>
  </nav>
}

export default withRouter(NavBar)