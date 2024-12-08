import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../assets/styles/Header.css'; // Import the CSS file

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="title">LenZ</h1>
        <div className="nav-links">
          {!user ? (
            <>
              <Link to="/signup" className="nav-link">Signup</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          ) : (
            <>
            {user && <span className="welcome-message">{user.name}</span>}
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={logout} className="logout-button">Logout</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
