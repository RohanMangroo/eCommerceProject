import React from 'react';
import Movies from './Movies';
import '../styles/hero.css';
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
