import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>INFO</h3>
        <ul>
          <li>
            <a href="/">Formats</a>
          </li>
          <li>
            <a href="/">Compression</a>
          </li>
          <li>
            <a href="/">Pricing</a>
          </li>
          <li>
            <a href="/">FAQ</a>
          </li>
          <li>
            <a href="/">Status</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>RESOURCES</h3>
        <ul>
          <li>
            <a href="/">Developer API</a>
          </li>
          <li>
            <a href="/">Tools</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>COMPANY</h3>
        <ul>
          <li>
            <a href="/">About Us</a>
          </li>
          <li>
            <a href="/">Sustainability</a>
          </li>
          <li>
            <a href="/">Terms of Service</a>
          </li>
          <li>
            <a href="/">Privacy</a>
          </li>
        </ul>
      </div>
      <div className="footer-section subscribe-section">
        <h3>Subscribe to our email newsletter</h3>
        <div className="subscribe-container">
          <input type="email" placeholder="Your email" />
          <button>SUBSCRIBE</button>
        </div>
        <h3>Follow us</h3>
        <div className="social-icons">
          <a href="/">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="/">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="/">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
