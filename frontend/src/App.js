import React, { useEffect } from 'react';
import Axios from 'axios';
import Navbar from './components/navbar/Navbar';
import UniversalRoutes from './components/UniversalRoutes';
import LogIn from './components/auth/LogIn/LogIn';
import SignUpAlt from './components/auth/SignUp/SignUpAlt';
import Footer from './components/footer/Footer';
import utils from './utils';
import { connect } from 'react-redux';
import { updateAuth } from './store/authReducer';
import { updateCart } from './store/cartReducer';
import { updateFav } from './store/favReducer';
import './styles/app.css';

function App({ updateAuth_, updateCart_, updateFav_ }) {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      updateAuth_({
        isLoggedIn: true,
        token: token,
        userId: localStorage.getItem('id'),
        username: localStorage.getItem('username'),
      });

      async function getCartInfo() {
        const endPoint = 'http://localhost:5000/user/cart';
        const config = { headers: { authorization: token } };
        const response = await Axios.get(endPoint, config);
        const cart = utils.processResponse(response.data);

        updateCart_(cart);
      }

      async function getUserFavorites() {
        const endPoint = 'http://localhost:5000/user/fav';
        const config = { headers: { authorization: token } };
        const response = await Axios.get(endPoint, config);

        updateFav_(response.data);
      }

      getCartInfo();
      getUserFavorites();
    } else {
      const localCart = localStorage.getItem('cart');
      if (!localCart) localStorage.setItem('cart', JSON.stringify([]));
      updateCart_(JSON.parse(localCart));
    }
  });

  return (
    <div className="app-container">
      <Navbar />
      <LogIn />
      <SignUpAlt />
      <UniversalRoutes />
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth_: (data) => {
      return dispatch(updateAuth(data));
    },
    updateCart_: (data) => {
      return dispatch(updateCart(data));
    },
    updateFav_: (data) => {
      return dispatch(updateFav(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
