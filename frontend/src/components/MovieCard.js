import React from 'react';

export default function MovieCard({ background }) {
  console.log(background);
  return (
    <div className="movie-card flex-col">
      <div
        className="movie-image"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>
      <button>Add To Cart</button>
    </div>
  );
}
