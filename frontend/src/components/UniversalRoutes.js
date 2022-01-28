import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import SignUp from './SignUp';

export default function UniversalRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}
