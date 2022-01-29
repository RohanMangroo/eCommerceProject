import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UniversalRoutes from './components/UniversalRoutes';
import Footer from './components/Footer';
import LogIn from './components/LogIn';
import { connect } from 'react-redux';
import { updateAuth } from './store/authReducer';
import './styles/app.css';

function App({ updateAuth_ }) {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    const haveToken = localStorage.getItem('token');
    if (haveToken)
      updateAuth_(
        {
          isLoggedIn: true,
          token: haveToken,
          userId: localStorage.getItem('id'),
        },
        []
      );
  });

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

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth_: (data) => {
      return dispatch(updateAuth(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
