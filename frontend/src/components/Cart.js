import React from 'react';
import '../styles/cart-total.css';

export default function Cart() {
  return (
    <div>
      <div className="cart-page flex-col">
        <section className="cart-top flex-row">
          <div className="cart-orders">
            <div className="cart-row"></div>
          </div>
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
        </section>
        <section className="cart-bottom"></section>
      </div>
    </div>
  );
}
