import React from 'react';
import '../styles/login.css';

export default function LogIn({ toggleLogin }) {
  const loginClass = toggleLogin === true ? 'close' : 'open';
  return <div className={`login-container ${loginClass}`}></div>;
}
