import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateAuth } from '../../store/authReducer';
import { connect } from 'react-redux';
import { updateLocalStorage, changeHandler } from '../../utils';
import '../../styles/login.css';

function LogIn({ toggleLogin, updateAuth_ }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmitHandler(event) {
    event.preventDefault();

    const response = await Axios.post('http://localhost:5000/auth/logIn', {
      username,
      password,
    });
    console.log(response.data);
    if (response.data.isLoggedIn) {
      updateAuth_(response.data);
      updateLocalStorage(response.data.token, response.data.userId);
      navigate('/');
    }
  }

  const loginClass =
    toggleLogin === true ? 'login-container close' : 'login-container open';
  const formClass =
    toggleLogin === true ? 'login-form display-none' : 'login-form display';

  return (
    <div className={loginClass}>
      <form className={formClass} onSubmit={onSubmitHandler}>
        <UsernameInput
          changeHandler={(event) =>
            changeHandler(event, setPassword, setUsername)
          }
          username={username}
        />
        <PasswordInput
          changeHandler={(event) =>
            changeHandler(event, setPassword, setUsername)
          }
          password={password}
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

function UsernameInput({ changeHandler, username }) {
  return (
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
  );
}

function PasswordInput({ changeHandler, password }) {
  return (
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
