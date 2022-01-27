import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <Link to="/signUp">
        <button>Sign Up</button>
      </Link>
      <Link to="/logIn">
        <button>Log In</button>
      </Link>
    </div>
  );
}
