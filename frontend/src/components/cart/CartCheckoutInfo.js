import React, { useState, useRef } from 'react';
import CheckOutBtn from './CheckOutBtn';
// import Axios from 'axios';

export default function CartCheckoutInfo({ subtotal, taxes, total }) {
  const [promoTotal, setPromoTotal] = useState(1);

  const disabled = promoTotal === 1 ? false : true;
  const savingsDrop = promoTotal === 1 ? 'close-savings' : 'open-savings';
  // const savings = total - promoTotal;

  // const finalTotal = promoTotal ? promoTotal : total;

  return (
    <div className="cart-total-container flex-col center-items">
      <div className="cart-total-subcontainer flex-col">
        <Subtotal subtotal={subtotal} />
        <Taxes taxes={taxes} />
        <span className="login-line cart-line"></span>
        <Total
          discount={promoTotal}
          savingsDrop={savingsDrop}
          currentTotal={total}
        />
        <PromoCode
          setPromoTotal={setPromoTotal}
          currentTotal={total}
          disabled={disabled}
        />
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

function Total({ discount, savingsDrop, currentTotal }) {
  const currentDiscount = discount !== 1 ? currentTotal * discount : 0;

  const finalTotal = currentTotal - currentDiscount;

  return (
    <div className="cart-total">
      <span>TOTAL</span>
      <span className="amount-txt">{`$${finalTotal.toFixed(2)}`}</span>
      <div className={`savings ${savingsDrop}`}>
        <span>Saved</span>
        <span>{`$${currentDiscount.toFixed(2)}`}</span>
      </div>
    </div>
  );
}

function PromoCode({ setPromoTotal, currentTotal, disabled }) {
  const promoRef = useRef();

  const promoCodes = {
    code: 0.01,
    cenimas: 0.1,
    mypromo: 0.2,
    discount: 0.5,
  };

  function handleClick(event) {
    event.preventDefault();
    if (promoRef.current.value in promoCodes) {
      // const discount = currentTotal * promoCodes[promoRef.current.value];

      setPromoTotal(promoCodes[promoRef.current.value]);
      promoRef.current.value = '';
    }
  }
  return (
    <div className="cart-promo-code">
      <form onClick={handleClick}>
        <label htmlFor="promo-code"></label>
        <input
          placeholder="PROMO CODE"
          type="text"
          name="promo-code"
          id="promo-code"
          ref={promoRef}
          disabled={disabled}
        ></input>
        <button disabled={disabled} type="submit" className="promo-btn">
          ADD
        </button>
      </form>
    </div>
  );
}
