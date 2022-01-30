import { createItemRows } from '../../utils';
import '../../styles/cart-orders.css';

export default function CartOrderInfo({ items }) {
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
