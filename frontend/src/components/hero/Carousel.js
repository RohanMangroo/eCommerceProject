import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import image from '../../images/splash2.jpg';

export default function Carousel({ list }) {
  return <HeroImage />;
}

// frontend/src/images/movieHero.jpg
// /Users/rohan/e-commerce/frontend/src/images/movieHero.jpg
function HeroImage() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMoveLists() {
      const listOne = await Axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1`
      );
      setMovieList(listOne.data.results);
    }
    getMoveLists();
  }, []);

  return (
    <div className="hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="overlay center-items">
        <span>C I N E M A S</span>
        {/* <Slider list={movieList} /> */}
      </div>
    </div>
  );
}

function Slider({ list }) {
  const [currentPosition, setPosition] = useState(0);

  function clickHandler(event) {
    const value = event.target.value;
    setPosition((prev) => {
      const newValue = value === 'left' ? prev - 1 : prev + 1;
      if (newValue < 0) return 0;
      else return newValue;
    });
  }

  if (list.length) {
    const { backdrop_path, title } = list[currentPosition];
    const imageOne = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

    return (
      <div className="slider">
        <Image image={imageOne} title={title} />
        <LeftBtn clickHandler={clickHandler} />
        <RightBtn clickHandler={clickHandler} />
      </div>
    );
  }

  return <></>;
}

function Image({ image, title }) {
  return (
    <div
      className="hero-movie-image"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
}

function LeftBtn({ clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className="carousel-btn-left carousel-btn"
      value="left"
    >
      {'<'}
    </button>
  );
}

function RightBtn({ clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className="carousel-btn-right carousel-btn"
      value="right"
    >
      {'>'}
    </button>
  );
}
