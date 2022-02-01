import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateAuth } from '../../store/authReducer';
import { toggleSignUp } from '../../store/signUpReducer';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { changeHandlerSignUp, updateLocalStorage } from '../../utils';

function SignUpAlt({ signUp, toggleSignUp_, updateAuth_ }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const [password, setPassword] = useState('');

  useEffect(() => {
    if (!signUp.open) {
      setUsername('');
      setEmail('');
      setPassword('');
    }
  }, [signUp.open]);

  async function onSubmitHandler(event) {
    event.preventDefault();

    const response = await Axios.post('http://localhost:5000/auth/signUp', {
      username,
      email,
      password,
    });

    if (response.data.isLoggedIn) {
      updateAuth_(response.data);
      updateLocalStorage(response.data.token, response.data.userId);
      toggleSignUp_(!signUp.open);
      setUsername('');
      setEmail('');
      setPassword('');
      return;
    }

    //   setError('Bad Username');
  }

  const signUpClass = signUp.open === true ? 'open' : 'close';
  const formClass =
    signUp.open === true ? 'login-form display' : 'login-form display-none';

  return (
    <div className={`${signUpClass} login-container temp`}>
      <header className="login-header">MEMBER SIGNUP</header>
      <span className="login-line"></span>
      <form onSubmit={onSubmitHandler} className={formClass}>
        <UsernameInput
          changeHandler={(event) =>
            changeHandlerSignUp(event, setUsername, setEmail, setPassword)
          }
          username={username}
        />
        <EmailInput
          changeHandler={(event) =>
            changeHandlerSignUp(event, setUsername, setEmail, setPassword)
          }
          email={email}
        />
        <PasswordInput
          changeHandler={(event) =>
            changeHandlerSignUp(event, setUsername, setEmail, setPassword)
          }
          password={password}
        />
        <button type="submit" className="btn temp-btn">
          S I G N U P
        </button>
      </form>
      {/* <span className="already-member center-items">
        Already a member? <b className="bold"> Log In </b>
      </span> */}
    </div>
  );
}

const mapStateToProps = ({ signUp }) => {
  return {
    signUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth_: (data) => {
      return dispatch(updateAuth(data));
    },
    toggleSignUp_: (boolean) => {
      return dispatch(toggleSignUp(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpAlt);

function UsernameInput({ changeHandler, username }) {
  return (
    <div>
      <label htmlFor="username"></label>
      <div className="icon-container center-items">
        <AiOutlineUser className="username-icon" />
      </div>

      <input
        placeholder="Username"
        onChange={changeHandler}
        value={username}
        type="text"
        name="username"
        id="username"
        required
      ></input>
    </div>
  );
}

function EmailInput({ changeHandler, email }) {
  return (
    <div>
      <label htmlFor="email"></label>
      <div className="icon-container center-items">
        <RiLockPasswordLine className="username-icon" />
      </div>
      <input
        placeholder="Email"
        onChange={changeHandler}
        value={email}
        type="email"
        name="email"
        id="email"
        required
      ></input>
    </div>
  );
}

function PasswordInput({ changeHandler, password }) {
  return (
    <div>
      <label htmlFor="password"></label>
      <div className="icon-container center-items">
        <RiLockPasswordLine className="username-icon" />
      </div>
      <input
        placeholder="Password"
        onChange={changeHandler}
        value={password}
        type="text"
        name="password"
        id="password"
      ></input>
    </div>
  );
}
