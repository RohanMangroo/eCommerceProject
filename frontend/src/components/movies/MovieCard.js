import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/movie-card.css';
import { connect } from 'react-redux';
import { updateCart } from '../../store/cartReducer';
import Axios from 'axios';

function MovieCard({ movieData, updateCart_ }) {
  async function clickHandler() {
    const token = localStorage.getItem('token');
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem('cart'));
      localCart.push(movieData);
      localStorage.setItem('cart', JSON.stringify(localCart));
      updateCart_([movieData]);
    } else {
      const response = await Axios.post(
        'http://localhost:5000/user/cart/item',
        { movieData },
        {
          headers: {
            authorization: token,
          },
        }
      );
      const array = [];

      for (let item in response.data) {
        array.push({ title: item, quantity: Number(response.data[item]) });
      }

      updateCart_(array);
    }
  }
  const sale = movieData.price === '4.99' ? 'SALE' : '';

  return (
    <div>
      <div className="movie-card flex-col">
        <Link className="card-link" to={`/movie/${movieData.id}`}>
          <div
            className="movie-image"
            style={{
              backgroundImage: `url(${movieData.background})`,
            }}
          ></div>
        </Link>
        <button onClick={clickHandler} className="btn">
          Add To Cart
        </button>
        {movieData.removeRating ? (
          ''
        ) : (
          <span className="movie-rating center-items">{movieData.rating}</span>
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
