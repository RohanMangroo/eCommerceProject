import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBtns({ auth, toggleLogin, handleLogOut }) {
  if (!auth) {
    return (
      <>
        <Link className="nav-link center-items" to="/signUp">
          <button className="nav-btn">Sign Up</button>
        </Link>
        <button className="nav-btn login-btn" onClick={toggleLogin}>
          Log In
        </button>
      </>
    );
  } else {
    return (
      <button className="nav-btn login-btn" onClick={handleLogOut}>
        Log Out
      </button>
    );
  }
}
