import { AiOutlineUser } from 'react-icons/ai';

export default function UsernameInput({ changeHandler, username }) {
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
