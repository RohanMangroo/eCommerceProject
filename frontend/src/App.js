import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import UniversalRoutes from './components/UniversalRoutes';
import Footer from './components/footer/Footer';
// import LogIn from './components/auth/LogIn';
import { connect } from 'react-redux';
import { updateAuth } from './store/authReducer';
import './styles/app.css';

function App({ updateAuth_ }) {
  // const [closed, setClosed] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token)
      updateAuth_({
        isLoggedIn: true,
        token: token,
        userId: localStorage.getItem('id'),
      });
  });

  // function clickHandler() {
  //   setClosed(!closed);
  // }

  return (
    <div className="app-container">
      <Navbar />
      {/* <LogIn /> */}
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
