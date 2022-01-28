import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { ReactComponent as CartIcon } from '../images/cartIcon.svg';

export default function Navbar() {
  return (
    <div className="navbar flex-row">
      <Link className="nav-link" to="/signUp">
        <button>Sign Up</button>
      </Link>
      <Link className="nav-link" to="/">
        <button>Log In</button>
      </Link>
      <Link to="/logIn">
        <button className="cart">
          <CartIcon />
        </button>
      </Link>
      <Link className="movie-go-title" to="/">
        <span>
          MOVI<b>e</b>GO
        </span>
      </Link>
    </div>
  );
}
