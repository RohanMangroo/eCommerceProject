import utils from '../../utils';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useViewport } from '../../components/customHooks';

function Favorites({ myFavs }) {
  const { width } = useViewport();
  const menuComponent = (
    <>
      <div className="history-btn-container flex-row fav-btns">
        <Link to="/user/:id/favorites">
          <button className="fav-menu-btn">FAV</button>
        </Link>
        <Link to="/user/:id">
          <button className="history-menu-btn">HISTORY</button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="user-info fav-container">
      <div className="order-history">
        <div className="cart-orders-subcontainer">
          <header className="cart-row header fav-header">
            <span>Favorites</span>
            {width <= 768 ? menuComponent : ''}
          </header>
          <SimpleBar className="simple-bar order-simple-bar simple-fav">
            {utils.createFavoritesRow(myFavs)}
          </SimpleBar>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ favs }) => {
  return {
    myFavs: favs,
  };
};

export default connect(mapStateToProps, null)(Favorites);
