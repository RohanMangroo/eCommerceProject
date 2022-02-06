import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Cart from './cart/Cart';
import SingleMovie from './movies/SingleMovie';
import UserPage from './user/UserPage';
import ScrollToTop from './ScrollToTop';

export default function UniversalRoutes() {
  // console.log('rendering...');
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/movie/:mediaType/:id" element={<SingleMovie />}></Route>
          <Route path="/user/:id" element={<UserPage />}></Route>
        </Routes>
      </ScrollToTop>
    </>
  );
}
