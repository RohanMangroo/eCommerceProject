import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Carousel from './Carousel';

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
