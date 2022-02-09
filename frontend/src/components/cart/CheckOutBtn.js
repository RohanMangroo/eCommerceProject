import React, { useState } from 'react';
import { emptyCart } from '../../store/cartReducer';
import { connect } from 'react-redux';
import Axios from 'axios';
import Modal from '../modal/Modal';

function CheckOutBtn({ emptyCart_, currentTotal, discount }) {
  const [checkout, setCheckout] = useState(null);

  async function handleClick(setCheckout) {
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
        localStorage.setItem('cart', JSON.stringify([]));
        emptyCart_();
      }
    }

    setCheckout(null);
  }

  if (!checkout) {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }

  function showModal() {
    setCheckout('checkout');
  }

  function toggleModal() {
    setCheckout(null);
  }

  const currentDiscount = discount !== 1 ? currentTotal * discount : 0;

  const finalTotal = currentTotal - currentDiscount;

  return (
    <>
      <button onClick={showModal} className="cart-checkout">
        C H E C K O U T
      </button>
      {checkout && (
        <Modal
          modalClass="open"
          error={checkout}
          toggle={() => handleClick(setCheckout)}
          total={finalTotal.toFixed(2)}
          cancel={toggleModal}
        />
      )}
    </>
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
