import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Cart from './cart/Cart';
import SingleMovie from './movies/SingleMovie';

export default function UniversalRoutes() {
  // console.log('rendering...');
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/movie/:id" element={<SingleMovie />}></Route>
      </Routes>
    </>
  );
}
