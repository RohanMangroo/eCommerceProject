import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UsernameInput from './UsernameInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

import { connect } from 'react-redux';
import { updateAuth } from '../../../store/authReducer';
import { toggleSignUp } from '../../../store/signUpReducer';
import utils from '../../../utils';

/**================================================================*/

function SignUpAlt({ signUp, toggleSignUp_, updateAuth_ }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**================================================================*/

  useEffect(() => {
    if (!signUp.open) utils.resetInput([setUsername, setPassword, setPassword]);
  }, [signUp.open]);

  async function onSubmitHandler(event) {
    event.preventDefault();

    //Sending down login info along with local storage cart
    const logInEndPoint = 'http://localhost:5000/auth/signUp';
    const requestBody = { username, email, password };
    const response = await Axios.post(logInEndPoint, requestBody);

    if (response.data.isLoggedIn) {
      updateAuth_(response.data);
      toggleSignUp_(!signUp.open);
      utils.updateLocalStorage(response.data.token, response.data.userId);
      utils.resetInput([setUsername, setPassword, setPassword]);
      return;
    }
  }

  /**================================================================*/

  const signUpClass = signUp.open === true ? 'open' : 'close';
  const formClass =
    signUp.open === true ? 'login-form display' : 'login-form display';

  /**================================================================*/

  return (
    <div className={`${signUpClass} login-container temp`}>
      <header className="login-header">MEMBER SIGNUP</header>
      <span className="login-line"></span>
      <form onSubmit={onSubmitHandler} className={formClass}>
        <UsernameInput
          changeHandler={(event) =>
            utils.changeHandlerSignUp(event, setUsername, setEmail, setPassword)
          }
          username={username}
        />
        <EmailInput
          changeHandler={(event) =>
            utils.changeHandlerSignUp(event, setUsername, setEmail, setPassword)
          }
          email={email}
        />
        <PasswordInput
          changeHandler={(event) =>
            utils.changeHandlerSignUp(event, setUsername, setEmail, setPassword)
          }
          password={password}
        />
        <button type="submit" className="btn temp-btn">
          S I G N U P
        </button>
      </form>
    </div>
  );
}

/**================================================================*/

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
