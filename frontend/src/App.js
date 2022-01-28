import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UniversalRoutes from './components/UniversalRoutes';
import Footer from './components/Footer';
import LogIn from './components/LogIn';
import './styles/app.css';

export default function App() {
  const [closed, setClosed] = useState(true);

  function clickHandler() {
    setClosed(!closed);
  }

  return (
    <div className="app-container">
      <Navbar toggleLogin={clickHandler} />
      <LogIn toggleLogin={closed} />
      <UniversalRoutes />
      <Footer />
    </div>
  );
}
