import React from 'react'; 
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2024 LenZ. All rights reserved.</p>
        <p className="footer-phone">Contact us: <a href="tel:+918967310388" className="footer-phone-link">+91-8967310388</a></p>
        <div className="footer-links">
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
