import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NotFound.css'; // Optional: Add CSS for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="not-found-links">
        <p>You can go back to:</p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
