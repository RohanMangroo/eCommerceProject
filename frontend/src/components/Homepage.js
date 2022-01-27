import React from 'react';
import '../styles/hero.css';
import '../styles/movies.css';
import '../styles/homepage.css';

export default function Homepage() {
  return (
    <div className="homepage">
      <Hero />
      <Movies />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">Left Part</div>
      <div className="hero-right">Right Part</div>
    </section>
  );
}

function Movies() {
  return (
    <section className="movies-container center-items">
      <div className="movies-sub-container">
        <MovieCard />
      </div>
    </section>
  );
}

function MovieCard() {
  return <div className="movie-card"></div>;
}
