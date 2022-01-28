import React from 'react';
import '../styles/movie-card.css';

export default function MovieCard({ background, title, rating, date, price }) {
  const sale = price === '4.99' ? 'SALE' : '';

  return (
    <div className="movie-card flex-col">
      <div
        className="movie-image"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>
      <button className="btn">Add To Cart</button>
      <span className="movie-rating center-items">{rating}</span>
      <div className="movie-info flex-col">
        <span className="title">{title}</span>
        <div className="flex-row">
          <span className="date">{date}</span>
          <span className="price">
            <span>{price}</span>
            <span className="sale">{sale}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
