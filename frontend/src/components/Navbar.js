import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { ReactComponent as CartIcon } from '../images/cartIcon.svg';
import { connect } from 'react-redux';

function Navbar({ toggleLogin, cart, auth }) {
  console.log(auth);
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
          <span className="cart-count center-items">{cart.items.length}</span>
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

const mapStateToProps = ({ cart, auth }) => {
  return {
    cart,
    auth,
  };
};

export default connect(mapStateToProps, null)(Navbar);
