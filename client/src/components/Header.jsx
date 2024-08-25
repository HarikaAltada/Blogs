import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">ZuAi</h1>
      </div>
      <div className="header-right">
        <button className="login-btn">Login</button>
        <button className="join-btn">Join Now</button>
      </div>
    </header>
  );
}

export default Header;
