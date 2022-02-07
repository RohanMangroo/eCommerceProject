import React from 'react';
import Movies from './movies/Movies';
import Hero from './hero/Hero';
import '../styles/hero.css';
import '../styles/homepage.css';
import { useViewport } from '../components/customHooks';

export default function Homepage() {
  const { width } = useViewport();
  return (
    <div className="homepage">
      {width > 736 && <Hero />}
      <Movies />
    </div>
  );
}
