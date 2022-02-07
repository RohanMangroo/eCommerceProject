import Axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import utils from '../../utils';
import { connect } from 'react-redux';
import { updateCart } from '../../store/cartReducer';
import { VscTriangleDown } from 'react-icons/vsc';
import { useViewport } from '../../components/customHooks';

function OrderHistory({ items, updateCart_ }) {
  const { width } = useViewport();
  async function clickHandler(event) {
    const token = localStorage.getItem('token');
    const movieData = JSON.parse(event.target.value);
    //Otherwise we call dwon to the server and have the item placed in redis storage
    const endPoint = 'http://localhost:5000/user/cart/item';

    const body = { movieData };
    const config = { headers: { authorization: token } };
    const response = await Axios.post(endPoint, body, config);
    const cart = utils.processResponse(response.data);

    updateCart_(cart);
  }

  const menuComponent = (
    <>
      Order History
      <div className="history-btn-container flex-row">
        <button className="fav-menu-btn">FAV</button>
        <button className="history-menu-btn">HISTORY</button>
      </div>
    </>
  );

  const toRender = width <= 768 ? menuComponent : 'Order History';

  return (
    <div className="order-history">
      <div className="cart-orders-subcontainer history">
        <header className="cart-row header ">
          <span className="flex-row history-title center-items">
            {toRender}
          </span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span>Date</span>
        </header>
        <SimpleBar
          onClick={clickHandler}
          className="simple-bar order-simple-bar"
        >
          {utils.createOrderHistoryRow(items)}
        </SimpleBar>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart_: (data) => {
      return dispatch(updateCart(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(OrderHistory);
