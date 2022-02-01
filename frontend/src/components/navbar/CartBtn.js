import React from 'react';
import { Link } from 'react-router-dom';
// import { ReactComponent as CartIcon } from '../../images/cartIcon.svg';
import { BsFillCartCheckFill } from 'react-icons/bs';

export default function CartBtn({ cart }) {
  return (
    <Link to="/cart" className="cart-link">
      <button className="cart">
        <BsFillCartCheckFill className="cart-icon" />
        <span className="cart-count center-items">{cart.items.length}</span>
      </button>
    </Link>
  );
}
