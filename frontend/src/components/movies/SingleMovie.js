import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import utils from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/singleMovie.css';
import { connect } from 'react-redux';

function SingleMovie({ productType }) {
  const [movieData, setMovieData] = useState();
  const [castData, setCastData] = useState();
  const [related, setRelated] = useState();
  const params = useParams();

  useEffect(() => {
    async function getMovieData() {
      let movieDataEndpoint;
      let castDataEndpoint;
      let relatedMoviesEndpoint;

      if (productType === 'movie') {
        movieDataEndpoint = `https://api.themoviedb.org/3/movie/${params.id}?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US`;
        castDataEndpoint = `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US`;
        relatedMoviesEndpoint = `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1`;
      } else {
        movieDataEndpoint = `https://api.themoviedb.org/3/tv/${params.id}?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US`;
        castDataEndpoint = `https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US`;
        relatedMoviesEndpoint = `https://api.themoviedb.org/3/tv/${params.id}/similar?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&page=1`;
      }

      const movieData = await Axios.get(movieDataEndpoint);
      const castData = await Axios.get(castDataEndpoint);
      const relatedMovies = await Axios.get(relatedMoviesEndpoint);

      setMovieData(movieData.data);
      setCastData(castData.data);
      setRelated(relatedMovies.data.results);
    }

    getMovieData();
  }, [params.id, productType, params]);

  //This object will contain movies that have low quality main images so we'll use the secondary image
  const changePath = { 19404: true };

  if (movieData && castData && related) {
    const { poster_path, backdrop_path } = movieData;
    let path;

    if (params.id in changePath) path = poster_path;
    else path = backdrop_path;

    return (
      <div className="single-movie-container">
        <section className="hero">
          <Slider image={`https://image.tmdb.org/t/p/original/${path}`} />
        </section>
        <section className="single-movie-info flex-row">
          <div className="center-items">
            {utils.createMovieCards([movieData])}
          </div>
          <div>
            <MovieDetails movie={movieData} cast={castData.cast} />
          </div>
        </section>
        <div className="related-txt center-items">RELATED</div>
        <section className="related flex-row">
          {utils.createMovieCards(related, true)}
        </section>
      </div>
    );
  } else return <div>Loading...</div>;
}

const mapStateToProps = ({ productType }) => {
  return {
    productType,
  };
};

export default connect(mapStateToProps, null)(SingleMovie);

function MovieDetails({ movie, cast }) {
  const castArray = cast.slice(0, 5);

  const currentTitle = movie.title ? movie.title : movie.name;
  const currentDate = movie.release_date
    ? movie.release_date
    : movie.first_air_date;

  return (
    <div className="movie-details flex-col">
      <div>
        <span>{currentTitle}</span>
        <span>{utils.trimDate(currentDate)}</span>
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

function Slider({ image }) {
  return (
    <div className="slider">
      <Image image={image} />
    </div>
  );
}

function Image({ image, title }) {
  return (
    <>
      <div
        className="hero-movie-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="overlay-img-one center-items">
        WATCH YOUR FAVORITES ON DEMAND
      </div>
      <div className="overlay-img-two center-items"></div>
    </>
  );
}

//url(https://image.tmdb.org/t/p/original/${path})`,
