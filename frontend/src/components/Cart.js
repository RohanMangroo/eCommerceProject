import React from 'react';
import '../styles/cart-total.css';
import '../styles/cart-orders.css';
import { createItemRows } from '../utils';
import { connect } from 'react-redux';

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

function CartOrderInfo({ items }) {
  return (
    <div className="cart-orders center-items">
      <div className="cart-orders-subcontainer">
        <header className="cart-row header">
          <span>Item</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </header>
        {createItemRows(items)}
      </div>
    </div>
  );
}

function CartCheckoutInfo() {
  return (
    <div className="cart-total-container flex-col center-items">
      <div className="cart-total-subcontainer flex-col">
        <div>
          <span className="cart-subtotal">SUBTOTAL</span>
          <span className="amount-txt">$56.98</span>
        </div>
        <div>
          <span className="cart-shipping">SHIPPING</span>
          <span className="amount-txt">$4.99</span>
        </div>
        <div className="cart-tax">
          <span>ESTIMATED TAXES</span>
          <span className="amount-txt">$2.78</span>
        </div>
        <div className="cart-total">
          <span>TOTAL</span>
          <span className="amount-txt">$66.78</span>
        </div>

        <div className="cart-promo-code">
          <form>
            <label htmlFor="promo-code"></label>
            <input
              defaultValue="PROMO CODE"
              type="text"
              name="promo-code"
              id="promo-code"
            ></input>
            <button className="promo-btn">Add</button>
          </form>
        </div>

        <div className="cart-checkout">
          <span>Checkout</span>
        </div>
      </div>
    </div>
  );
}
