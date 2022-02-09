import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLogin } from '../../store/logInReducer';
import { toggleSignUp } from '../../store/signUpReducer';
import { toggleUserMenu } from '../../store/userMenuReducer';
import CartBtn from './CartBtn';

function NavBtns({
  handleLogOut,
  auth,
  toggleLogin_,
  open,
  signUp,
  toggleSignUp_,
  userMenu,
  toggleUserMenu_,
  cart,
}) {
  function clickHandler(event) {
    const value = event.target.value;
    if (value === 'logIn') {
      toggleLogin_(!open.open);
      signUp.open && toggleSignUp_(!signUp.open);
      userMenu.open && toggleUserMenu_(!userMenu.open);
    } else if (value === 'signUp') {
      toggleSignUp_(!signUp.open);
      open.open && toggleLogin_(!open.open);
      userMenu.open && toggleUserMenu_(!userMenu.open);
    } else {
      toggleUserMenu_(!userMenu.open);
      signUp.open && toggleSignUp_(!signUp.open);
      open.open && toggleLogin_(!open.open);
    }

    event.stopPropagation();
  }

  const signUpBtn = signUp.open ? 'sign-up-btn-active' : '';
  const loginUpBtn = open.open ? 'login-btn-ative' : '';

  if (!auth.isLoggedIn) {
    return (
      <>
        <button
          value="signUp"
          className={`nav-btn ${signUpBtn}`}
          onClick={(event) => clickHandler(event)}
        >
          Sign Up
        </button>

        <button
          value="logIn"
          className={`nav-btn login-btn ${loginUpBtn}`}
          onClick={(event) => clickHandler(event)}
        >
          Log In
        </button>
        <CartBtn cart={cart} />
      </>
    );
  } else {
    const userFirstInitial = auth.username[0].toUpperCase();

    return (
      <>
        <button
          value="menu"
          onClick={clickHandler}
          className="user-info-nav-btn"
        >
          <div className="user-info-nav flex-row">
            <div className="welcome center-items">Welcome</div>
            <div className="user-initial center-items">{userFirstInitial}</div>
          </div>
        </button>

        <button className="nav-btn login-btn" onClick={handleLogOut}>
          Log Out
        </button>
        <CartBtn cart={cart} />
      </>
    );
  }
}

const mapStateToProps = ({ open, signUp, userMenu }) => {
  return {
    open,
    signUp,
    userMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLogin_: (boolean) => {
      return dispatch(toggleLogin(boolean));
    },
    toggleSignUp_: (boolean) => {
      return dispatch(toggleSignUp(boolean));
    },
    toggleUserMenu_: (boolean) => {
      return dispatch(toggleUserMenu(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBtns);
