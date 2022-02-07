import React from 'react';
import { Link } from 'react-router-dom';
import { useViewport } from '../../components/customHooks';

export default function Logo() {
  const { width } = useViewport();

  const value = width <= 414 ? 'C' : 'C E N I M A S';
  const responsiveClass = width <= 414 ? 'resp-class' : '';
  return (
    <Link className={`movie-go-title ${responsiveClass}`} to="/">
      <span>{value}</span>
    </Link>
  );
}
