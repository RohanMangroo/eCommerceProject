import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLogin } from '../../store/logInReducer';
import { toggleSignUp } from '../../store/signUpReducer';

function NavBtns({
  handleLogOut,
  auth,
  toggleLogin_,
  open,
  signUp,
  toggleSignUp_,
}) {
  // console.log(open);

  function clickHandler(event) {
    const value = event.target.value;
    if (value === 'logIn') {
      toggleLogin_(!open.open);
      signUp.open && toggleSignUp_(!signUp.open);
    } else {
      toggleSignUp_(!signUp.open);
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
      </>
    );
  } else {
    const userFirstInitial = auth.username[0].toUpperCase();

    return (
      <>
        <Link to={`/user/${auth.userId}`} className="user-info-nav-btn">
          <div className="user-info-nav flex-row">
            <div className="welcome center-items">Welcome</div>
            <div className="user-initial center-items">{userFirstInitial}</div>
          </div>
        </Link>

        <button className="nav-btn login-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ open, signUp }) => {
  return {
    open,
    signUp,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBtns);
