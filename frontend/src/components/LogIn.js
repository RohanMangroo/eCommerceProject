import React from 'react';
import '../styles/login.css';

export default function LogIn({ toggleLogin }) {
  const loginClass = toggleLogin === true ? 'close' : 'open';
  const formClass = toggleLogin === true ? 'display-none' : 'display';

  return (
    <div className={`login-container ${loginClass}`}>
      <form className={`login-form ${formClass}`}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="usename" id="username"></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password"></input>
        </div>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
