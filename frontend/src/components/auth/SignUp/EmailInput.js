import { RiLockPasswordLine } from 'react-icons/ri';

export default function EmailInput({ changeHandler, email }) {
  return (
    <div>
      <label htmlFor="email"></label>
      <div className="icon-container center-items">
        <RiLockPasswordLine className="username-icon" />
      </div>
      <input
        placeholder="Email"
        onChange={changeHandler}
        value={email}
        type="email"
        name="email"
        id="email"
        required
      ></input>
    </div>
  );
}
