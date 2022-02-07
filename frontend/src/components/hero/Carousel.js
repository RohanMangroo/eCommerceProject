import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Carousel({ list }) {
  return <HeroImage list={list} />;
}

function HeroImage({ list }) {
  return (
    <div className="hero">
      <Slider list={list} />
    </div>
  );
}

function Slider({ list }) {
  const [currentPosition, setPosition] = useState(0);

  function clickHandler(event) {
    const value = event.target.value;
    setPosition((prev) => {
      const newValue = value === 'left' ? prev - 1 : prev + 1;
      if (newValue < 0) return list.length - 1;
      if (newValue >= list.length) return 0;
      else return newValue;
    });
  }

  if (list.length) {
    const { backdrop_path, title, name, id, media_type } =
      list[currentPosition];
    const imageOne = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    const finalTitle = title ? title : name;
    return (
      <div className="slider">
        <Image
          image={imageOne}
          title={finalTitle}
          id={id}
          mediaType={media_type}
        />
        <LeftBtn clickHandler={clickHandler} />
        <RightBtn clickHandler={clickHandler} />
      </div>
    );
  }

  return <div>Loading...</div>;
}

function Image({ image, title, id, mediaType }) {
  return (
    <>
      <Link to={`/movie/${mediaType}/${id}`}>
        <div
          className="hero-movie-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </Link>
      <div className="overlay-img-one center-items">
        WATCH YOUR FAVORITES ON DEMAND
      </div>
      <div className="overlay-img-two center-items"></div>{' '}
      <span className="hero-name center-items">{title}</span>
    </>
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
