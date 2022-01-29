import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { ReactComponent as CartIcon } from '../images/cartIcon.svg';

export default function Navbar({ toggleLogin }) {
  return (
    <div className="navbar flex-row">
      <Link className="nav-link center-items" to="/signUp">
        <button className="nav-btn">Sign Up</button>
      </Link>
      <button className="nav-btn login-btn" onClick={toggleLogin}>
        Log In
      </button>
      <Link to="/cart">
        <button className="cart">
          <CartIcon />
        </button>
      </Link>
      <Link className="movie-go-title" to="/">
        <span>
          MOVI<b>e</b>GO
        </span>
      </Link>
    </div>
  );
}
