import React from 'react';

export default function CartCheckoutInfo() {
  return (
    <div className="cart-total-container flex-col center-items">
      <div className="cart-total-subcontainer flex-col">
        <Subtotal />
        <Shipping />
        <Taxes />
        <Total />
        <PromoCode />
        <CheckOutBtn />
      </div>
    </div>
  );
}

function Subtotal() {
  return (
    <div>
      <span className="cart-subtotal">SUBTOTAL</span>
      <span className="amount-txt">$56.98</span>
    </div>
  );
}

function Shipping() {
  return (
    <div>
      <span className="cart-shipping">SHIPPING</span>
      <span className="amount-txt">$4.99</span>
    </div>
  );
}

function Taxes() {
  return (
    <div className="cart-tax">
      <span>ESTIMATED TAXES</span>
      <span className="amount-txt">$2.78</span>
    </div>
  );
}

function Total() {
  return (
    <div className="cart-total">
      <span>TOTAL</span>
      <span className="amount-txt">$66.78</span>
    </div>
  );
}

function PromoCode() {
  return (
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
  );
}

function CheckOutBtn() {
  return (
    <div className="cart-checkout">
      <span>Checkout</span>
    </div>
  );
}
