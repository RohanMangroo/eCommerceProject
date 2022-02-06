import React from 'react';
import { RiFilmFill } from 'react-icons/ri';
import { BiMoviePlay } from 'react-icons/bi';
import { GiPopcorn } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';

export default function Menu() {
  return (
    <div className="user-menu flex-col open">
      <header className="center-items">G E T</header>
      <button>
        <div className="icons-container">
          <BiUserCircle className=" icon user-icon" />
        </div>
        <span>M Y P A G E</span>
      </button>
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
