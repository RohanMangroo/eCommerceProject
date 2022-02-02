import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { updateAuth } from '../../store/authReducer';
import { connect } from 'react-redux';
import { updateLocalStorage, changeHandler } from '../../utils';
import { toggleLogin } from '../../store/logInReducer';
import Modal from '../modal/Modal';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { updateCart } from '../../store/cartReducer';
import '../../styles/login.css';

function LogIn({ toggleLogin_, updateAuth_, updateCart_, open }) {
  // const navigate = useNavigate();
  const ref = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open.open) {
      setUsername('');
      setPassword('');
    }
  }, [open.open]);

  async function onSubmitHandler(event) {
    event.preventDefault();
    const localCart = JSON.parse(localStorage.getItem('cart'));

    const response = await Axios.post('http://localhost:5000/auth/logIn', {
      username,
      password,
      localCart,
    });

    if (response.data.isLoggedIn) {
      console.log(response.data.cart);
      updateAuth_(response.data);
      updateLocalStorage(response.data.token, response.data.userId);
      localStorage.removeItem('cart');
      toggleLogin_(!open.open);
      setUsername('');
      setPassword('');

      const array = [];

      for (let item in response.data.cart) {
        array.push({ title: item, quantity: response.data.cart[item] });
      }
      console.log(array);
      updateCart_(array);
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

  const modalClass = error ? 'open' : 'close';

  return (
    <div ref={ref} className={`${loginClass}`}>
      <header className="login-header">MEMBER LOGIN</header>
      <span className="login-line"></span>

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
        <button className="btn">L O G I N</button>
      </form>
      {error && (
        <Modal modalClass={modalClass} error={error} toggle={toggleModal} />
      )}
    </div>
  );
}

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
    updateCart_: (data) => {
      return dispatch(updateCart(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
