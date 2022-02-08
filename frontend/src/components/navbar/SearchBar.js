import React, { useState, useRef } from 'react';
import '../../styles/search-bar.css';
import { BsSearch } from 'react-icons/bs';
import { connect } from 'react-redux';
import { updateProductType } from '../../store/productsReducer';
import { updateQuery } from '../../store/queryReducer';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Modal from '../modal/Modal';

function SearchBar({ updateProductType_, updateQuery_ }) {
  const ref = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function toggleModal() {
    setError(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const value = ref.current.value;

    const rawQuery = value.trim();
    let query = '';

    for (let i = 0; i < rawQuery.length; i++) {
      const currentChar = rawQuery[i];
      if (currentChar === ' ') query += '%20';
      else query += currentChar;
    }
    const listOne = await Axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&query=${query}&page=$1&include_adult=false`
    );
    if (listOne.data.results.length === 0) {
      setError(rawQuery);
      return;
    }
    updateQuery_(ref.current.value);
    updateProductType_(null);
    ref.current.value = '';

    navigate('/');
  }

  if (!error) {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="search"></label>
        <input
          ref={ref}
          type="text"
          name="search"
          id="search"
          placeholder="Search"
        ></input>
      </form>
      <div className="search-icon-container center-items">
        <BsSearch />
      </div>
      {error && <Modal modalClass="open" error={error} toggle={toggleModal} />}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductType_: (type) => {
      return dispatch(updateProductType(type));
    },
    updateQuery_: (data) => {
      return dispatch(updateQuery(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);

//https://api.themoviedb.org/3/search/multi?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&query=The%20Wire&page=1&include_adult=false
