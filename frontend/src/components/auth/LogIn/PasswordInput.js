import { RiLockPasswordLine } from 'react-icons/ri';

export default function PasswordInput({ changeHandler, password }) {
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
