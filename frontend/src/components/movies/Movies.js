import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import utils from '../../utils';
import { BiRightArrow } from 'react-icons/bi';
import { BiLeftArrow } from 'react-icons/bi';
import { connect } from 'react-redux';
import '../../styles/movies-container.css';

function Movies({ productType }) {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMoveLists() {
      // let listOne;
      if (productType === 'movie') {
        const listOne = await Axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=${page}`
        );
        setMovieList(listOne.data.results);
      } else if (productType === 'tv') {
        const listOne = await Axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=${page}`
        );
        setMovieList(listOne.data.results);
      } else {
        const rawQuery = productType.trim();
        let query = '';

        for (let i = 0; i < rawQuery.length; i++) {
          const currentChar = rawQuery[i];
          if (currentChar === ' ') query += '%20';
          else query += currentChar;
        }

        // const listOne = await Axios.get(
        //   `https://api.themoviedb.org/3/search/movie?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&query=${query}&page=1&include_adult=false`
        // );

        const listOne = await Axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&query=${query}&page=${page}&include_adult=false`
        );

        // return;
        //68721
        setMovieList(listOne.data.results);
        // console.log(query);
        // console.log(
        //   `https://api.themoviedb.org/3/search/multi?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&query=${query}&page=${page}&include_adult=false`
        // );
        // const listOne = await Axios.get(
        //   `https://api.themoviedb.org/3/search/multi?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&query=${query}&page=${page}&include_adult=false`
        // );
        // setMovieList(listOne.data.results);
      }
      //https://api.themoviedb.org/3/search/multi?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&query=The%20Wire&page=1&include_adult=false
      // setMovieList(listOne.data.results);
    }

    getMoveLists();
  }, [page, productType]);

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
      <div
        onClick={clickHandler}
        className="page-btns page-btn-top flex-row center-items"
      >
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
      <div
        onClick={clickHandler}
        className="page-btns page-btn-bottom flex-row center-items"
      >
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

const mapStateToProps = ({ productType }) => {
  return {
    productType,
  };
};

export default connect(mapStateToProps, null)(Movies);
