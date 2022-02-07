import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import Cart from './cart/Cart';
import SingleMovie from './movies/SingleMovie';
import UserPage from './user/UserPage';
import ScrollToTop from './ScrollToTop';
import CartCheckoutInfo from './cart/CartCheckoutInfo';
import Favorites from './user/Favorites';
import { useViewport } from '../components/customHooks';

export default function UniversalRoutes() {
  const { width } = useViewport();
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/cart/checkout"
            element={
              width <= 768 ? <CartCheckoutInfo /> : <Navigate to="/cart" />
            }
          />
          <Route path="/movie/:mediaType/:id" element={<SingleMovie />}></Route>
          <Route path="/user/:id" element={<UserPage />}></Route>
          <Route
            path="/user/:id/favorites"
            element={width <= 768 ? <Favorites /> : <Navigate to="/user/:id" />}
          />
        </Routes>
      </ScrollToTop>
    </>
  );
}
