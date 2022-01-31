import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { updateAuth } from '../../store/authReducer';
import { connect } from 'react-redux';
import { updateLocalStorage, changeHandler } from '../../utils';
import { toggleLogin } from '../../store/logInReducer';
import Modal from '../modal/Modal';
import '../../styles/login.css';

function LogIn({ toggleLogin_, updateAuth_, open }) {
  // const navigate = useNavigate();
  const ref = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  async function onSubmitHandler(event) {
    event.preventDefault();

    const response = await Axios.post('http://localhost:5000/auth/logIn', {
      username,
      password,
    });

    if (response.data.isLoggedIn) {
      updateAuth_(response.data);
      updateLocalStorage(response.data.token, response.data.userId);
      toggleLogin_(!open.open);
      setUsername('');
      setPassword('');
    } else setError('No User Found');
  }

  function toggleModal() {
    setError(null);
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open.open && ref.current && !ref.current.contains(e.target)) {
        toggleLogin_(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, [open.open, toggleLogin_]);

  const loginClass =
    open.open === true ? 'login-container open' : 'login-container close';
  const formClass =
    open.open === true ? 'login-form display' : 'login-form display-none';

  return (
    <div ref={ref} className={loginClass}>
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
      {error && <Modal error={error} toggle={toggleModal} />}
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

const mapStateToProps = ({ open }) => {
  return {
    open,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth_: (data) => {
      return dispatch(updateAuth(data));
    },
    toggleLogin_: (boolean) => {
      return dispatch(toggleLogin(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
