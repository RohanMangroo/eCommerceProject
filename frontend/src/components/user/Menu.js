import React, { useEffect, useRef } from 'react';
import { RiFilmFill } from 'react-icons/ri';
import { BiMoviePlay } from 'react-icons/bi';
import { GiPopcorn } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleUserMenu } from '../../store/userMenuReducer';

function Menu({ userMenu, toggleUserMenu_ }) {
  //  When the user clicks outside the menu it will close(Need to better understand this
  useEffect(() => {
    const closeMenu = (e) => {
      toggleUserMenu_(false);
    };
    // document.addEventListener('click', checkIfClickedOutside);
    document.addEventListener('click', closeMenu);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', closeMenu);
    };
  }, [userMenu, toggleUserMenu_]);

  /**================================================================*/

  const userId = localStorage.getItem('id');

  const menuClass = userMenu.open ? 'open' : 'close';

  return (
    <div className={`user-menu flex-col ${menuClass}`}>
      <header className="center-items">G E T</header>
      <span className="user-menu-line"></span>

      <Link to={`/`} className="user-info-nav-btn">
        <button>
          <div className="icons-container">
            <ImHome className=" icon home-icon" />
          </div>
          <span>H O M E</span>
        </button>
      </Link>

      <Link to={`/user/${userId}`} className="user-info-nav-btn">
        <button>
          <div className="icons-container">
            <BiUserCircle className=" icon user-icon" />
          </div>
          <span>M Y P A G E</span>
        </button>
      </Link>

      <button>
        <div className="icons-container">
          <RiFilmFill className="icon movies-icon" />
        </div>
        <span>M O V I E S</span>
      </button>
      <button>
        <div className="icons-container">
          <BiMoviePlay className="icon tv-icon" />
        </div>
        <span>T E L E V I S I O N </span>
      </button>
      <button>
        <div className="icons-container">
          <GiPopcorn className="icon pop-icon" />
        </div>
        <span> P O P U L A R</span>
      </button>
    </div>
  );
}

const mapStateToProps = ({ userMenu }) => {
  return {
    userMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleUserMenu_: (boolean) => {
      return dispatch(toggleUserMenu(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
