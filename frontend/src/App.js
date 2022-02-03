import React, { useEffect } from 'react';
import Axios from 'axios';
import Navbar from './components/navbar/Navbar';
import UniversalRoutes from './components/UniversalRoutes';
import Footer from './components/footer/Footer';
import utils from './utils';
import { connect } from 'react-redux';
import { updateAuth } from './store/authReducer';
import { updateCart } from './store/cartReducer';
import './styles/app.css';

function App({ updateAuth_, updateCart_ }) {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      updateAuth_({
        isLoggedIn: true,
        token: token,
        userId: localStorage.getItem('id'),
      });

      async function getCartInfo() {
        const endPoint = 'http://localhost:5000/user/cart';
        const config = { headers: { authorization: token } };
        const response = await Axios.get(endPoint, config);
        const cart = utils.processResponse(response.data);

        updateCart_(cart);
      }

      getCartInfo();
    } else {
      const localCart = localStorage.getItem('cart');
      if (!localCart) localStorage.setItem('cart', JSON.stringify([]));
      updateCart_(JSON.parse(localCart));
    }
  });

  return (
    <div className="app-container">
      <Navbar />
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
  };
};

export default connect(null, mapDispatchToProps)(App);
