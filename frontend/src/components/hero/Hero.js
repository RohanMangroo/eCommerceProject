import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Carousel from './Carousel';
import { connect } from 'react-redux';

function Hero({ productType }) {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMovieLists() {
      let listOne;

      if (productType === 'tv') {
        listOne = await Axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=3`
        );
      } else {
        listOne = await Axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1`
        );
      }

      setMovieList(listOne.data.results);
    }
    getMovieLists();
  }, [productType]);

  return (
    <section>
      <Carousel list={movieList} />
    </section>
  );
}

const mapStateToProps = ({ productType }) => {
  return {
    productType,
  };
};

export default connect(mapStateToProps, null)(Hero);
