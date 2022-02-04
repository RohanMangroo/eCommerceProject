import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import utils from '../../utils';
import { BiRightArrow } from 'react-icons/bi';
import { BiLeftArrow } from 'react-icons/bi';
import '../../styles/movies-container.css';

export default function Movies() {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMoveLists() {
      const listOne = await Axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=${page}`
      );
      setMovieList(listOne.data.results);
    }
    getMoveLists();
  }, [page]);

  function clickHandler(event) {
    if (event.target.id) {
      setPage((prev) => {
        const newPage = utils.changePage(event.target.id, prev);
        return newPage;
      });
    }
  }

  return (
    <>
      <div onClick={clickHandler} className="page-btns flex-row center-items">
        <button className="btn" value="prev">
          <BiLeftArrow id="prev" className="prev-page-icon" />
        </button>
        <button className="btn" value="next">
          <BiRightArrow id="next" className="next-page-icon" />
        </button>
      </div>
      <section className="movies-container flex-col">
        <div className="movies-sub-container">
          {utils.createMovieCards(movieList)}
        </div>
      </section>
      <div onClick={clickHandler} className="page-btns flex-row center-items">
        <button className="btn" value="prev">
          <BiLeftArrow id="prev" className="prev-page-icon" />
        </button>
        <button className="btn" value="next">
          <BiRightArrow id="next" className="next-page-icon" />
        </button>
      </div>
    </>
  );
}
