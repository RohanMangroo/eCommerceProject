import React, { useState } from 'react';
import CartOrderInfo from './CartOrderInfo';
import CartCheckoutInfo from './CartCheckoutInfo';
import { connect } from 'react-redux';
import '../../styles/cart-total.css';

function Cart({ cart }) {
  // const [subtotal, setSubtotal] = useState(0);
  let subtotal = 0;

  // console.log(cart.items);
  cart.items.forEach((item) => {
    const quantity = item.quantity;
    const price = Number(item.title.split('/')[1]);
    subtotal += price * quantity;
  });

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
