import utils from '../../utils';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { connect } from 'react-redux';

function Favorites({ myFavs }) {
  return (
    <div className="user-info">
      <div className="order-history">
        <div className="cart-orders-subcontainer">
          <header className="cart-row header fav-header">
            <span>Favorites</span>
          </header>
          <SimpleBar className="simple-bar order-simple-bar">
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
