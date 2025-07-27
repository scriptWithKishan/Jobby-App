import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaSignOutAlt} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-container-lg">
        <Link to="/">
          <img
            className="header-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="header-nav-list">
          <Link className="header-links" to="/">
            <li className="nav-item">Home</li>
          </Link>
          <Link className="header-links" to="/jobs">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <button onClick={onClickLogout} className="logout-btn" type="button">
          Logout
        </button>
      </nav>
      <nav className="nav-container-sm">
        <Link to="/">
          <img
            className="header-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="header-nav-list">
          <Link className="header-links" to="/">
            <li className="nav-item">
              <AiFillHome className="header-icons" />
            </li>
          </Link>
          <Link className="header-links" to="/jobs">
            <li>
              <BsBriefcaseFill className="header-icons" />
            </li>
          </Link>
          <li>
            <button
              aria-label="Logout"
              className="header-btn-sm"
              onClick={onClickLogout}
              type="button"
            >
              <FaSignOutAlt className="header-icons" />
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
