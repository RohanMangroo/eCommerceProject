import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MovieCard from './MovieCard';
import '../styles/movies.css';

export default function Movies() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMoveLists() {
      const listOne = await Axios.get(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1'
      );
      setMovieList(listOne.data.results);
    }

    getMoveLists();
  }, []);

  return (
    <section className="movies-container flex-row center-items">
      <div className="movies-sub-container">{createMovieCards(movieList)}</div>
    </section>
  );
}

function createMovieCards(movieList) {
  const array = [];
  for (let i = 0; i < movieList.length; i++) {
    const movie = movieList[i];
    const { poster_path } = movie;
    const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    array.push(<MovieCard key={`${i}`} background={image} />);
  }

  return array;
}

//API Key f4b964a7e615c3824313f9121ff9270d
//Imge URL format https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg
//GET Top Movies https://api.themoviedb.org/3/movie/top_rated?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1
//GET More Top Movies https://api.themoviedb.org/3/movie/popular?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1
