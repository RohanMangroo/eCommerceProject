import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import Modal from '../../modal/Modal';
import utils from '../../../utils';

import { connect } from 'react-redux';
import { updateAuth } from '../../../store/authReducer';
import { toggleLogin } from '../../../store/logInReducer';
import { updateCart } from '../../../store/cartReducer';
import { updateFav } from '../../../store/favReducer';

import '../../../styles/login.css';

/**================================================================*/

function LogIn({ toggleLogin_, updateAuth_, updateCart_, updateFav_, open }) {
  const ref = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  /**================================================================*/

  //Reseting the inputs on remount
  useEffect(() => {
    if (!open.open) utils.resetInput([setUsername, setPassword]);
  }, [open.open]);

  // When the user clicks outside the menu it will close(Need to better understand this
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

  /**================================================================*/

  //Click Handler
  async function onSubmitHandler(event) {
    event.preventDefault();
    //Grabbing cart in local storage
    const localCart = JSON.parse(localStorage.getItem('cart'));

    //Sending down login info along with local storage cart
    const logInEndPoint = '/auth/logIn';
    const requestBody = { username, password, localCart };
    const response = await Axios.post(logInEndPoint, requestBody);

    if (response.data.isLoggedIn) {
      updateAuth_(response.data);
      toggleLogin_(!open.open);
      utils.updateLocalStorage(
        response.data.token,
        response.data.userId,
        response.data.username
      );
      utils.resetInput([setUsername, setPassword]);

      localStorage.removeItem('cart');

      const cart = utils.processResponse(response.data.cart);

      const favorites = response.data.favorites;
      updateCart_(cart);
      updateFav_(favorites);
    } else setError('No User Found');
  }

  function toggleModal() {
    setError(null);
  }

  if (!error) {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }
  /**================================================================*/

  const loginClass =
    open.open === true ? 'login-container open' : 'login-container close';
  const formClass =
    open.open === true ? 'login-form display' : 'login-form display';

  const modalClass = error ? 'open' : 'close';

  /**================================================================*/
  return (
    <div ref={ref} className={`${loginClass}`}>
      <header className="login-header">MEMBER LOGIN</header>
      <span className="login-line"></span>

      <form className={formClass} onSubmit={onSubmitHandler}>
        <UsernameInput
          changeHandler={(event) =>
            utils.changeHandler(event, setPassword, setUsername)
          }
          username={username}
        />
        <PasswordInput
          changeHandler={(event) =>
            utils.changeHandler(event, setPassword, setUsername)
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

/**================================================================*/

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
    updateFav_: (data) => {
      return dispatch(updateFav(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
