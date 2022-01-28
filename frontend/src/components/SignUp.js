import React from 'react';
import '../styles/form.css';

export default function SignUp() {
  return (
    <div className="sign-up-page center-items">
      <div className="form-container flex-col center-items">
        <span className="sign-up center-items">Sign Up</span>

        <form className="flex-col center-items">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" required></input>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required></input>
          <label html="password">Password</label>
          <input type="text" name="password" id="password" required></input>
          <button className="my-btn">Sign Up</button>
        </form>
        <span className="already-member center-items">
          Already a member? <b className="bold"> Log In </b>
        </span>
      </div>
    </div>
  );
}
