import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import utils from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/singleMovie.css';

export default function SingleMovie() {
  const [movieData, setMovieData] = useState();
  const [castData, setCastData] = useState();
  const [related, setRelated] = useState();
  const params = useParams();

  useEffect(() => {
    async function getMovieData() {
      const movieDataEndpoint = `https://api.themoviedb.org/3/movie/${params.id}?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US`;
      const castDataEndpoint = `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US`;
      const relatedMoviesEndpoint = `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1`;

      const movieData = await Axios.get(movieDataEndpoint);
      const castData = await Axios.get(castDataEndpoint);
      const relatedMovies = await Axios.get(relatedMoviesEndpoint);

      setMovieData(movieData.data);
      setCastData(castData.data);
      setRelated(relatedMovies.data.results);
    }

    getMovieData();
  }, [params.id]);

  //This object will contain movies that have low quality main images so we'll use the secondary image
  const changePath = { 19404: true };

  if (movieData && castData && related) {
    const { poster_path, backdrop_path } = movieData;
    let path;

    if (params.id in changePath) path = poster_path;
    else path = backdrop_path;

    return (
      <div className="single-movie-container">
        <section
          className="single-movie-image"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${path})`,
          }}
        ></section>
        <section className="single-movie-info flex-row">
          <div className="center-items">
            {utils.createMovieCards([movieData])}
          </div>
          <div>
            <MovieDetails movie={movieData} cast={castData.cast} />
          </div>
        </section>
        <section className="related flex-row">
          {utils.createMovieCards(related, true)}
        </section>
      </div>
    );
  } else return <div>Loading...</div>;
}

function MovieDetails({ movie, cast }) {
  const castArray = cast.slice(0, 5);

  return (
    <div className="movie-details flex-col">
      <div>
        <span>{movie.title}</span>
        <span>{utils.trimDate(movie.release_date)}</span>
      </div>
      <span>{movie.tagline}</span>
      <span>{movie.overview}</span>
      <span className="flex-row">
        <b>Genre:</b>
        {movie.genres.map((genre) => {
          return <span key={uuidv4()}>{genre.name}</span>;
        })}
      </span>
      <span>
        <b>Language: </b>
        <span>{movie.spoken_languages[0].english_name}</span>
      </span>

      <section className="cast flex-row">
        <b>Cast: </b>
        {castArray.map((actor) => {
          return <span key={uuidv4()}>{actor.name}</span>;
        })}
      </section>
    </div>
  );
}
