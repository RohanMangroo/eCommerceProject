import React from 'react';
import Axios from 'axios';
import utils from '../../utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCart } from '../../store/cartReducer';
import '../../styles/movie-card.css';

function MovieCard({ movieData, updateCart_ }) {
  //Button handler
  async function clickHandler() {
    const token = localStorage.getItem('token');

    //If there is no token(user is not logged in) we need to drop that item into local storage
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem('cart'));
      const movieTitle = `${movieData.title}/${movieData.price}`;

      utils.addItemToLocalCart(localCart, movieTitle);
      localStorage.setItem('cart', JSON.stringify(localCart));

      updateCart_(localCart);
    } else {
      //Otherwise we call dwon to the server and have the item placed in redis storage
      const endPoint = 'http://localhost:5000/user/cart/item';
      const body = { movieData };
      const config = { headers: { authorization: token } };
      const response = await Axios.post(endPoint, body, config);
      const cart = utils.processResponse(response.data);

      updateCart_(cart);
    }
  }
  const sale = movieData.price === '4.99' ? 'SALE' : '';
  const extraClass = movieData.removeRating ? 'no-btn' : '';

  return (
    <div>
      <div className={`movie-card flex-col ${extraClass}`}>
        <Link className="card-link" to={`/movie/${movieData.id}`}>
          <div
            className="movie-image"
            style={{
              backgroundImage: `url(${movieData.background})`,
            }}
          ></div>
        </Link>
        {movieData.removeRating ? (
          ''
        ) : (
          <>
            <button onClick={clickHandler} className="btn">
              Add To Cart
            </button>
            <span className="movie-rating center-items">
              {movieData.rating}
            </span>
          </>
        )}

        <div className="movie-info flex-col">
          <span className="title">{movieData.title}</span>
          <div className="flex-row">
            <span className="date">{movieData.date}</span>
            <span className="price">
              <span>{movieData.price}</span>
              <span className="sale">{sale}</span>
            </span>
          </div>
        </div>
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

export default connect(null, mapDispatchToProps)(MovieCard);
