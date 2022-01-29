import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Cart from './Cart';
import SignUp from './SignUp';
import SingleMovie from './SingleMovie';

export default function UniversalRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/movie/:id" element={<SingleMovie />}></Route>
      </Routes>
    </>
  );
}
