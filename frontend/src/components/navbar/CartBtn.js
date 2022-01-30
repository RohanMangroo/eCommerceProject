import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../../images/cartIcon.svg';

export default function CartBtn({ cart }) {
  return (
    <Link to="/cart">
      <button className="cart">
        <CartIcon />
        <span className="cart-count center-items">{cart.items.length}</span>
      </button>
    </Link>
  );
}
