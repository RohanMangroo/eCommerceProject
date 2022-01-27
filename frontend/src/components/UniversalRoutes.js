import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';

export default function UniversalRoutes() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/logIn" element={<LogIn />}></Route>
      </Routes>
    </>
  );
}
