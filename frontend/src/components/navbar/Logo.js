import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link className="movie-go-title" to="/">
      <span>
        MOVI<b>e</b>GO
      </span>
    </Link>
  );
}
