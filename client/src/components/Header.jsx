import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'react-proptypes';

/**
 * Header component
 * @param {object} props
 * @return {XML} JSX
 */
const Header = props => (
  <header>
    <div className="header clearfix">
      <nav>
        {
          (!sessionStorage.getItem('token') && !sessionStorage.getItem('username')) ?
            <ul className="nav nav-pills float-right">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </ul>
            :
            <ul className="nav nav-pills float-right">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link" onClick={ () => props.handleLogout(props.history) }>Logout</Link>
              </li>
            </ul>
        }
      </nav>
      <h3>Two factor auth demo</h3>
    </div>
  </header>
);

Header.propTypes = {
  handleLogout: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(Header);
