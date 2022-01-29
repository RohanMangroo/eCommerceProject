import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { ReactComponent as CartIcon } from '../images/cartIcon.svg';
import { connect } from 'react-redux';
import { updateAuth } from '../store/authReducer';

function Navbar({ toggleLogin, cart, auth, updateAuth_ }) {
  console.log(auth);

  function handleLogOut() {
    updateAuth_({ isLoggedIn: false, token: null, userId: null });
    localStorage.clear();
  }

  const toRender = !auth.isLoggedIn ? (
    <>
      <Link className="nav-link center-items" to="/signUp">
        <button className="nav-btn">Sign Up</button>
      </Link>
      <button className="nav-btn login-btn" onClick={toggleLogin}>
        Log In
      </button>
    </>
  ) : (
    <button className="nav-btn login-btn" onClick={handleLogOut}>
      Log Out
    </button>
  );

  return (
    <div className="navbar flex-row">
      {toRender}
      <Link to="/cart">
        <button className="cart">
          <CartIcon />
          <span className="cart-count center-items">{cart.items.length}</span>
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

const mapStateToProps = ({ cart, auth }) => {
  return {
    cart,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth_: (data) => {
      return dispatch(updateAuth(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
