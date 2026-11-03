
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">◆</span>
        <span>
          Cert<span className="brand-highlight">Verify</span>
        </span>
      </Link>

      <ul className="navbar-nav">
        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <li>
                  <Link to="/admin-dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/verify-certificates">
                    Verify Certificates
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/student-dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/my-certificates">My Certificates</Link>
                </li>
                <li>
                  <Link to="/add-certificate">Add Certificate</Link>
                </li>
              </>
            )}

            <li className="user-area">
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <span className="user-name">
                Welcome, {user.name}
              </span>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="btn-logout"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register" className="nav-register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

