import React from 'react';
import CartOrderInfo from './CartOrderInfo';
import CartCheckoutInfo from './CartCheckoutInfo';
import { connect } from 'react-redux';
import utils from '../../utils';
import '../../styles/cart-total.css';

function Cart({ cart }) {
  const subtotal = utils.calculateSubtotal(cart);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  return (
    <div>
      <div className="cart-page flex-col">
        <section className="cart-top flex-row">
          <CartOrderInfo items={cart.items} />
          <CartCheckoutInfo
            subtotal={subtotal.toFixed(2)}
            taxes={taxes.toFixed(2)}
            total={total.toFixed(2)}
          />
        </section>
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
