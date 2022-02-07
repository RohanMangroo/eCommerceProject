import React, { useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleUserMenu } from '../store/userMenuReducer';
import { toggleSignUp } from '../store/signUpReducer';
import { toggleLogin } from '../store/logInReducer';
import { updateAuth } from '../store/authReducer';
import { updateFav } from '../store/favReducer';
import { emptyCart } from '../store/cartReducer';
import { toggleHam } from '../store/hamMenuReducer';
import { useNavigate } from 'react-router';
import { useViewport } from '../components/customHooks';

import '../styles/userMenu.css';
function HamburgerMenu({
  toggleUserMenu_,
  toggleSignUp_,
  toggleLogin_,
  toggleHam_,
  ham,
  updateAuth_,
  updateFav_,
  emptyCart_,
  auth,
}) {
  const { width } = useViewport();

  useEffect(() => {
    if (ham.open && width >= 900) toggleHam_(false);
  });

  //  When the user clicks outside the menu it will close(Need to better understand this
  useEffect(() => {
    const closeMenu = (e) => {
      if (ham.open) toggleHam_(false);
    };
    // document.addEventListener('click', checkIfClickedOutside);
    document.addEventListener('click', closeMenu);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', closeMenu);
    };
  }, [ham, toggleHam_]);

  //  When the user clicks outside the menu it will close(Need to better understand this
  //   useEffect(() => {
  //     const closeMenu = (e) => {
  //       toggleHam_(false);
  //     };
  //     // document.addEventListener('click', checkIfClickedOutside);
  //     document.addEventListener('click', closeMenu);

  //     return () => {
  //       // Cleanup the event listener
  //       document.removeEventListener('click', closeMenu);
  //     };
  //   }, [ham, toggleHam_]);

  /**================================================================*/

  const navigate = useNavigate();

  function handleLogOut() {
    updateAuth_({ isLoggedIn: false, token: null, userId: null });
    updateFav_({});
    navigate('/');
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify([]));
    emptyCart_();
  }

  //   function handleClick(event) {
  //     const type = event.target.value;
  //     if (type === 'movie') updateProductType_('movie');
  //     else if (type === 'tv') updateProductType_('tv');
  //   }

  const userId = localStorage.getItem('id');

  const menuClass = ham.open ? 'open' : 'close';

  function handleMenuClick(event) {
    const value = event.target.value;
    if (value === 'get') {
      toggleUserMenu_(true);
      toggleHam_(false);
      event.stopPropagation();
    } else if (value === 'signUp') {
      toggleSignUp_(true);
      toggleHam_(false);
    } else if (value === 'logIn') {
      toggleLogin_(true);
      toggleHam_(false);
    }
  }

  if (auth.isLoggedIn) {
    return (
      <div className={`user-menu flex-col  ham-menu ${menuClass}`}>
        <header className="center-items">M E N U</header>
        <span className="user-menu-line"></span>

        <div onClick={handleMenuClick} className="inner-div">
          <div className="icons-container">
            <BiUserCircle className=" icon home-icon" />
          </div>
          <button value="get">G E T</button>
        </div>

        <Link to={`/cart`} className="user-info-nav-btn">
          <div className="inner-div">
            <div className="icons-container">
              <BsFillCartCheckFill className=" icon user-icon" />
            </div>
            <button>C A R T</button>
          </div>
        </Link>

        <div onClick={handleLogOut} className="inner-div">
          <div className="icons-container">
            <FiLogOut className="icon movies-icon" />
          </div>
          <button value="movie">L O G O U T</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`user-menu flex-col  ham-menu ${menuClass}`}>
        <header className="center-items">M E N U</header>
        <span className="user-menu-line"></span>

        <div onClick={handleMenuClick} className="inner-div">
          <div className="icons-container">
            <BiUserCircle className=" icon home-icon" />
          </div>
          <button value="signUp">S I G N U P</button>
        </div>

        <div onClick={handleMenuClick} className="inner-div">
          <div className="icons-container">
            <FiLogOut className="icon movies-icon" />
          </div>
          <button value="logIn">L O G I N</button>
        </div>

        <Link to={`/cart`} className="user-info-nav-btn">
          <div className="inner-div">
            <div className="icons-container">
              <BsFillCartCheckFill className=" icon user-icon" />
            </div>
            <button>C A R T</button>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ userMenu, ham, auth }) => {
  return {
    ham,
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleUserMenu_: (boolean) => {
      return dispatch(toggleUserMenu(boolean));
    },
    toggleHam_: (boolean) => {
      return dispatch(toggleHam(boolean));
    },
    updateAuth_: (data) => {
      return dispatch(updateAuth(data));
    },
    emptyCart_: () => {
      return dispatch(emptyCart());
    },
    updateFav_: (data) => {
      return dispatch(updateFav({}));
    },
    toggleSignUp_: (boolean) => {
      return dispatch(toggleSignUp(boolean));
    },
    toggleLogin_: (boolean) => {
      return dispatch(toggleLogin(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);
