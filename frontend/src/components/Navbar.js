import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/signUp">
        <button>Sign Up</button>
      </Link>
      <Link to="/logIn">
        <button>Log In</button>
      </Link>
    </div>
  );
}
