import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isLoggedIn } from '../lib/auth'

const NavBar = (props) => {

  function handleLogout() {
    logout()
    props.history.push('/')
  }

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <div className="navbar-buttons-left">

              <Link to="/" className="button is-light">
                Home
              </Link>

              <Link to="/latest" className="button is-Light">
                Latest
              </Link>

              <Link to="/women" className="button is-Light">
                Women
              </Link>

              {isLoggedIn() && <Link to="/profile" className="button is-light">
                Favourites
              </Link>}

            </div>

            <h1>THE SCORE</h1>

            {isLoggedIn() && <Link to='/reviews' className= "button is-Light">
              Reviews
            </Link>}

    
            <div className="navbar-buttons-right">

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
    </div>
  </nav>
}

export default withRouter(NavBar)