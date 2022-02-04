import React from 'react';
import Axios from 'axios';
import utils from '../../utils';
import { updateCart } from '../../store/cartReducer';
import { connect } from 'react-redux';
import '../../styles/cart-orders.css';

function CartOrderInfo({ items, cart, updateCart_ }) {
  async function clickHandler(event, title) {
    const token = localStorage.getItem('token');
    let newCart;
    const typeOfClick = event.currentTarget.id;

    if (typeOfClick === 'plus') {
      newCart = utils.editCart(title, cart.items, 'plus');

      const endPoint = `http://localhost:5000/user/cart/item/quantity`;
      const body = { title, action: 'plus' };
      const config = {
        headers: { authorization: token },
      };
      await Axios.post(endPoint, body, config);
    } else if (typeOfClick === 'minus') {
      newCart = utils.editCart(title, cart.items, 'minus');

      const endPoint = `http://localhost:5000/user/cart/item/quantity`;
      const body = { title, action: 'minus' };
      const config = {
        headers: { authorization: token },
      };
      await Axios.post(endPoint, body, config);
    } else {
      newCart = utils.editCart(title, cart.items, 'delete');

      const endPoint = `http://localhost:5000/user/cart/item`;
      const config = { headers: { authorization: token }, data: { title } };
      await Axios.delete(endPoint, config);
    }

    updateCart_(newCart);
  }

  return (
    <div className="cart-orders center-items">
      <div className="cart-orders-subcontainer">
        <header className="cart-row header">
          <span>Item</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </header>
        {utils.createItemRows(items, clickHandler)}
      </div>
    </div>
  );
}

const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart_: (data) => {
      return dispatch(updateCart(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOrderInfo);
