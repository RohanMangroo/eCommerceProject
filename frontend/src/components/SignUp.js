import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateAuth } from '../store/authReducer';

function SignUp({ updateAuth_ }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmitHandler(event) {
    event.preventDefault();

    const response = await Axios.post('http://localhost:5000/signUp', {
      username,
      email,
      password,
    });

    if (response.data.isLoggedIn) {
      updateAuth_(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.userId);
      console.log(response.data);
      navigate('/');
    } else {
      navigate('/signUp');
      console.log(response.data);
    }
  }

  function changeHandler(event) {
    const input = event.target.name;
    const value = event.target.value;
    if (input === 'username') setUsername(value);
    else if (input === 'email') setEmail(value);
    else setPassword(value);
  }

  return (
    <div className="sign-up-page center-items">
      <div
        className="form-aside"
        style={{
          backgroundImage:
            'url(https://image.tmdb.org/t/p/w500/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg)',
        }}
      >
        <div className="overlay flex-col"></div>
      </div>
      <div className="form-container flex-col center-items">
        <span className="sign-up center-items">Sign Up</span>
        <form onSubmit={onSubmitHandler} className="flex-col center-items">
          <label htmlFor="username">Username</label>
          <input
            onChange={changeHandler}
            type="text"
            name="username"
            id="username"
            required
          ></input>
          <label htmlFor="email">Email</label>
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            id="email"
            required
          ></input>
          <label html="password">Password</label>
          <input
            onChange={changeHandler}
            type="text"
            name="password"
            id="password"
            required
          ></input>
          <button type="submit" className="my-btn">
            Sign Up
          </button>
        </form>

        <span className="already-member center-items">
          Already a member? <b className="bold"> Log In </b>
        </span>
      </div>
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
