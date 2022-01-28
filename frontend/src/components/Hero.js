import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Hero() {
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
    <section className="hero">
      <Carousel list={movieList} />
    </section>
  );
}

function Carousel({ list }) {
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
      <>
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${imageOne})`,
          }}
        >
          <span>{title}</span>
        </div>
        <button
          onClick={clickHandler}
          className="carousel-btn-left carousel-btn"
          value="left"
        >
          {'<'}
        </button>
        <button
          onClick={clickHandler}
          className="carousel-btn-right carousel-btn"
          value="right"
        >
          {'>'}
        </button>
      </>
    );
  }

  return <></>;
}
