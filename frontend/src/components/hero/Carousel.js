import React, { useState } from 'react';
// import image from '../../images/venom.jpg';

export default function Carousel({ list }) {
  return <HeroImage list={list} />;
}

function HeroImage({ list }) {
  return (
    <div className="hero">
      {/* <span>C I N E M A S</span> */}
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
