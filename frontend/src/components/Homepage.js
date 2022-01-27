import React from 'react';
import Movies from './Movies';
import Hero from './Hero';
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
