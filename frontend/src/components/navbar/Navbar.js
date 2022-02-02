import React from 'react';
import { connect } from 'react-redux';
import NavBtns from './NavBtns';
import CartBtn from './CartBtn';
import Logo from './Logo';
import LogIn from '../auth/LogIn';
import SignUpAlt from '../auth/SignUpAlt';
import { updateAuth } from '../../store/authReducer';
import { emptyCart } from '../../store/cartReducer';
import '../../styles/navbar.css';

function Navbar({ toggleLogin, cart, auth, updateAuth_, emptyCart_ }) {
  function handleLogOut() {
    updateAuth_({ isLoggedIn: false, token: null, userId: null });
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify([]));
    emptyCart_();
  }

  return (
    <div className="navbar flex-row">
      <NavBtns
        auth={auth.isLoggedIn}
        toggleLogin={toggleLogin}
        handleLogOut={handleLogOut}
      />
      <CartBtn cart={cart} />
      <Logo />
      <LogIn />
      <SignUpAlt />
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
    emptyCart_: () => {
      return dispatch(emptyCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
