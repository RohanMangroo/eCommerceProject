import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import NavBtns from './NavBtns';
// import CartBtn from './CartBtn';
import Logo from './Logo';
import SearchBar from './SearchBar';
import HamburgerIcon from './HamburgerIcon';
import { updateAuth } from '../../store/authReducer';
import { updateFav } from '../../store/favReducer';
import { emptyCart } from '../../store/cartReducer';
import '../../styles/navbar.css';

import { useViewport } from '../customHooks';

function Navbar({
  toggleLogin,
  cart,
  auth,
  updateAuth_,
  emptyCart_,
  updateFav_,
}) {
  const { width } = useViewport();
  const navigate = useNavigate();

  function handleLogOut() {
    updateAuth_({ isLoggedIn: false, token: null, userId: null });
    updateFav_({});
    navigate('/');
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify([]));
    emptyCart_();
  }

  const menu =
    width <= 900 ? (
      <HamburgerIcon />
    ) : (
      <NavBtns
        auth={auth}
        toggleLogin={toggleLogin}
        handleLogOut={handleLogOut}
        cart={cart}
      />
    );
  return (
    <div className="navbar flex-row">
      {menu}
      <Logo />
      {auth.isLoggedIn && <SearchBar />}
    </div>
  );
}

const mapStateToProps = ({ cart, auth }) => {
  return {
    cart,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth_: (data) => {
      return dispatch(updateAuth(data));
    },
    emptyCart_: () => {
      return dispatch(emptyCart());
    },
    updateFav_: (data) => {
      return dispatch(updateFav({}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
