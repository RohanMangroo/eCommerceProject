import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLogin } from '../../store/logInReducer';

function NavBtns({ handleLogOut, auth, toggleLogin_, open }) {
  if (!auth) {
    return (
      <>
        <Link className="nav-link center-items" to="/signUp">
          <button className="nav-btn">Sign Up</button>
        </Link>
        <button
          className="nav-btn login-btn"
          onClick={() => toggleLogin_(!open.open)}
        >
          Log In
        </button>
      </>
    );
  } else {
    return (
      <>
        <span className="temp">Welcome! </span>
        <button className="nav-btn login-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ open }) => {
  return {
    open,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLogin_: (boolean) => {
      return dispatch(toggleLogin(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBtns);
