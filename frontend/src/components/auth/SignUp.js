import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateAuth } from '../../store/authReducer';
import { changeHandlerSignUp, updateLocalStorage } from '../../utils';
import '../../styles/form.css';

import Modal from '../modal/Modal';

function SignUp({ updateAuth_ }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

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
      navigate('/');
      setUsername('');
      setEmail('');
      setPassword('');
      return;
    }

    setError('Bad Username');
  }

  function toggleModal() {
    setError(null);
  }

  return (
    <div className="sign-up-page center-items">
      <SignUpImage />
      <div className="form-container flex-col center-items">
        <span className="sign-up center-items">Sign Up</span>
        <form onSubmit={onSubmitHandler} className="flex-col center-items">
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
          />
          <PasswordInput
            changeHandler={(event) =>
              changeHandlerSignUp(event, setUsername, setEmail, setPassword)
            }
          />
          <button type="submit" className="my-btn">
            Sign Up
          </button>
        </form>
        <span className="already-member center-items">
          Already a member? <b className="bold"> Log In </b>
        </span>
      </div>
      {error && <Modal error={error} toggle={toggleModal} />}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth_: (data) => {
      return dispatch(updateAuth(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignUp);

function UsernameInput({ changeHandler }) {
  return (
    <>
      <label htmlFor="username">Username</label>
      <input
        onChange={changeHandler}
        type="text"
        name="username"
        id="username"
        required
      ></input>
    </>
  );
}

function EmailInput({ changeHandler }) {
  return (
    <>
      <label htmlFor="email">Email</label>
      <input
        onChange={changeHandler}
        type="email"
        name="email"
        id="email"
        required
      ></input>
    </>
  );
}

function PasswordInput({ changeHandler }) {
  return (
    <>
      <label html="password">Password</label>
      <input
        onChange={changeHandler}
        type="text"
        name="password"
        id="password"
        required
      ></input>
    </>
  );
}

function SignUpImage() {
  return (
    <div
      className="form-aside"
      style={{
        backgroundImage:
          'url(https://image.tmdb.org/t/p/w500/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg)',
      }}
    >
      <div className="overlay flex-col"></div>
    </div>
  );
}
