import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateAuth } from '../store/authReducer';
import { connect } from 'react-redux';
import '../styles/login.css';

function LogIn({ toggleLogin, updateAuth_ }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmitHandler(event) {
    event.preventDefault();

    const response = await Axios.post('http://localhost:5000/logIn', {
      username,
      password,
    });

    if (response.data.isLoggedIn) {
      console.log(response.data);
      updateAuth_(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.userId);
      navigate('/');
    } else {
      console.log(response.data);
      navigate('/');
    }
  }

  function changeHandler(event) {
    const input = event.target.name;
    const value = event.target.value;
    if (input === 'username') setUsername(value);
    else setPassword(value);
  }

  const loginClass = toggleLogin === true ? 'close' : 'open';
  const formClass = toggleLogin === true ? 'display-none' : 'display';

  return (
    <div className={`login-container ${loginClass}`}>
      <form onSubmit={onSubmitHandler} className={`login-form ${formClass}`}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={changeHandler}
            value={username}
            type="text"
            name="username"
            id="username"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={changeHandler}
            value={password}
            type="text"
            name="password"
            id="password"
          ></input>
        </div>

        <button className="btn">Submit</button>
      </form>
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

export default connect(null, mapDispatchToProps)(LogIn);
