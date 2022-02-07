import React, { useEffect } from 'react';
import { RiFilmFill } from 'react-icons/ri';
import { BiMoviePlay } from 'react-icons/bi';
import { GiPopcorn } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleUserMenu } from '../../store/userMenuReducer';
import { updateProductType } from '../../store/productsReducer';
import '../../styles/userMenu.css';

function Menu({ userMenu, toggleUserMenu_, updateProductType_ }) {
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

  function handleClick(event) {
    const type = event.target.value;
    if (type === 'movie') updateProductType_('movie');
    else if (type === 'tv') updateProductType_('tv');
  }

  const userId = localStorage.getItem('id');

  const menuClass = userMenu.open ? 'open' : 'close';

  return (
    <div onClick={handleClick} className={`user-menu flex-col ${menuClass}`}>
      <header className="center-items">G E T</header>
      <span className="user-menu-line"></span>

      <Link to={`/`} className="user-info-nav-btn">
        <div className="inner-div">
          <div className="icons-container">
            <ImHome className=" icon home-icon" />
          </div>
          <button>H O M E</button>
        </div>
      </Link>

      <Link to={`/user/${userId}`} className="user-info-nav-btn">
        <div className="inner-div">
          <div className="icons-container">
            <BiUserCircle className=" icon user-icon" />
          </div>
          <button>M Y P A G E</button>
        </div>
      </Link>

      <div className="inner-div">
        <div className="icons-container">
          <RiFilmFill className="icon movies-icon" />
        </div>
        <button value="movie">M O V I E S</button>
      </div>

      <div className="inner-div">
        <div className="icons-container">
          <BiMoviePlay className="icon tv-icon" />
        </div>
        <button value="tv">T E L E V I S I O N </button>
      </div>
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
    updateProductType_: (type) => {
      return dispatch(updateProductType(type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
