import React from 'react';
import { emptyCart } from '../../store/cartReducer';
import { connect } from 'react-redux';
import Axios from 'axios';

function CheckOutBtn({ emptyCart_ }) {
  async function handleClick() {
    const token = localStorage.getItem('token');

    const response = await Axios.post(
      'http://localhost:5000/user/cart/checkout',
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (response.data === 'Orders Submitted') {
      emptyCart_();
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
