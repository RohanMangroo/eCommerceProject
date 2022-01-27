import React from 'react';
import Navbar from './components/Navbar';
import UniversalRoutes from './components/UniversalRoutes';
import Footer from './components/Footer';
import './styles/app.css';

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <UniversalRoutes />
      <Footer />
    </div>
  );
}
