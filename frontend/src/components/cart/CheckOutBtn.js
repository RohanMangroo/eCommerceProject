import React from 'react';
import { emptyCart } from '../../store/cartReducer';
import { connect } from 'react-redux';
import Axios from 'axios';

function CheckOutBtn({ emptyCart_ }) {
  async function handleClick() {
    const token = localStorage.getItem('token');

    if (token) {
      const endPoint = 'http://localhost:5000/user/cart/checkout';
      const body = {};
      const config = { headers: { authorization: token } };
      const response = await Axios.post(endPoint, body, config);
      if (response.data === 'Orders Submitted') emptyCart_();
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart'));
      const endPoint = 'http://localhost:5000/user/cart/guestCheckout';
      const body = { localCart };
      const response = await Axios.post(endPoint, body);
      if (response.data === 'Orders Submitted') {
        localStorage.clear();
        emptyCart_();
      }
    }
  }

  return (
    <button onClick={handleClick} className="cart-checkout">
      C H E C K O U T
    </button>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    emptyCart_: () => {
      return dispatch(emptyCart());
    },
  };
};

export default connect(null, mapDispatchToProps)(CheckOutBtn);
