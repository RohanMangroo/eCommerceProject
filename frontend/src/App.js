import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import UniversalRoutes from './components/UniversalRoutes';
import Footer from './components/footer/Footer';
import { connect } from 'react-redux';
import { updateAuth } from './store/authReducer';
// import { toggleLogin } from './store/logInReducer';
import { updateCart } from './store/cartReducer';
import Axios from 'axios';
import './styles/app.css';

function App({ updateAuth_, updateCart_, toggleLogin_ }) {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      updateAuth_({
        isLoggedIn: true,
        token: token,
        userId: localStorage.getItem('id'),
      });

      async function getCartInfo() {
        const response = await Axios.get('http://localhost:5000/user/cart', {
          headers: {
            authorization: token,
          },
        });

        const array = [];

        for (let item in response.data) {
          array.push({ title: item, quantity: Number(response.data[item]) });
        }

        updateCart_(array);
      }

      getCartInfo();
    }

    const localCart = localStorage.getItem('cart');

    if (!localCart) localStorage.setItem('cart', JSON.stringify([]));

    updateCart_(JSON.parse(localCart));

    // console.log(JSON.parse(localCart));

    //else you are GUEST, so make a GUEST CART is local storage
  });

  // function clickHandler() {
  //   toggleLogin_(true);
  // }

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
    // toggleLogin_: (boolean) => {
    //   return dispatch(toggleLogin(boolean));
    // },
    updateCart_: (data) => {
      return dispatch(updateCart(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
