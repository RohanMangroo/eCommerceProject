import React, { useState } from 'react';

export default function Carousel({ list }) {
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
        <HeroImage imageOne={imageOne} title={title} />
        <LeftBtn clickHandler={clickHandler} />
        <RightBtn clickHandler={clickHandler} />
      </>
    );
  }

  return <></>;
}

function HeroImage({ imageOne, title }) {
  return (
    <div
      className="hero-image"
      style={{
        backgroundImage: `url(${imageOne})`,
      }}
    >
      <span>{title}</span>
    </div>
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
