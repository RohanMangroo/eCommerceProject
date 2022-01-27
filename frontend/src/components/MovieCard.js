import React from 'react';
import '../styles/movie-card.css';

export default function MovieCard({ background, title, rating, date }) {
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
        <span className="date">{date}</span>
      </div>
    </div>
  );
}
