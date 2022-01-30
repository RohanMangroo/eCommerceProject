import React from 'react';
import CartOrderInfo from './CartOrderInfo';
import CartCheckoutInfo from './CartCheckoutInfo';
import { connect } from 'react-redux';
import '../../styles/cart-total.css';

function Cart({ cart }) {
  return (
    <div>
      <div className="cart-page flex-col">
        <section className="cart-top flex-row">
          <CartOrderInfo items={cart.items} />
          <CartCheckoutInfo />
        </section>
        <section className="cart-bottom"></section>
      </div>
    </div>
  );
}

const mapStateToProps = ({ cart }) => {
  return {
    cart,
  };
};

export default connect(mapStateToProps, null)(Cart);
