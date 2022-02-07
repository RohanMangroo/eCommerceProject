import React from 'react';
import Axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import utils from '../../utils';
import { updateCart } from '../../store/cartReducer';
import { connect } from 'react-redux';
import '../../styles/cart-orders.css';
import { useViewport } from '../../components/customHooks';

function CartOrderInfo({ items, cart, updateCart_ }) {
  const { width } = useViewport();
  async function clickHandler(event, title) {
    const token = localStorage.getItem('token');
    let newCart;
    const typeOfClick = event.currentTarget.id;

    if (token) {
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
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart'));

      if (typeOfClick === 'plus')
        newCart = utils.editCart(title, localCart, 'plus');
      else if (typeOfClick === 'minus')
        newCart = utils.editCart(title, localCart, 'minus');
      else newCart = utils.editCart(title, localCart, 'delete');

      localStorage.setItem('cart', JSON.stringify(newCart));
    }

    updateCart_(newCart);
  }

  const menuComponent = (
    <>
      Item
      <div className="history-btn-container flex-row">
        <button className="fav-menu-btn cart-btn-one">ORDERS</button>
        <button className="history-menu-btn cart-btn-two">CHECKOUT</button>
      </div>
    </>
  );

  const toRender = width <= 768 ? menuComponent : 'Item';

  return (
    <div className="cart-orders center-items">
      <div className="cart-orders-subcontainer">
        <header className="cart-row header">
          <span className="flex-row center-items">{toRender}</span>

          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </header>
        <SimpleBar className="simple-bar">
          {utils.createItemRows(items, clickHandler)}
        </SimpleBar>
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
