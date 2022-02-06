import React from 'react';
import { RiFilmFill } from 'react-icons/ri';
import { BiMoviePlay } from 'react-icons/bi';
import { GiPopcorn } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Menu({ userMenu }) {
  const userId = localStorage.getItem('id');

  const menuClass = userMenu.open ? 'open' : 'close';
  console.log(userMenu);

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

export default connect(mapStateToProps, null)(Menu);
