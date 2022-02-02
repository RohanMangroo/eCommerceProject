import React from 'react';

export default function CartCheckoutInfo({ subtotal, taxes, total }) {
  return (
    <div className="cart-total-container flex-col center-items">
      <div className="cart-total-subcontainer flex-col">
        <Subtotal subtotal={subtotal} />
        <Taxes taxes={taxes} />
        <span className="login-line cart-line"></span>
        <Total total={total} />
        <PromoCode />
        <CheckOutBtn />
      </div>
    </div>
  );
}

function Subtotal({ subtotal }) {
  return (
    <div>
      <span className="cart-subtotal">SUBTOTAL</span>
      <span className="amount-txt">{`$${subtotal}`}</span>
    </div>
  );
}

function Taxes({ taxes }) {
  return (
    <div className="cart-tax">
      <span>ESTIMATED TAXES</span>
      <span className="amount-txt">{`$${taxes}`}</span>
    </div>
  );
}

function Total({ total }) {
  return (
    <div className="cart-total">
      <span>TOTAL</span>
      <span className="amount-txt">{`$${total}`}</span>
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
        <button className="promo-btn">ADD</button>
      </form>
    </div>
  );
}

function CheckOutBtn() {
  return <button className="cart-checkout">C H E C K O U T</button>;
}
