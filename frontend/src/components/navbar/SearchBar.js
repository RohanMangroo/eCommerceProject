import React, { useRef } from 'react';
import '../../styles/search-bar.css';
import { BsSearch } from 'react-icons/bs';
import { connect } from 'react-redux';
import { updateProductType } from '../../store/productsReducer';

function SearchBar({ updateProductType_ }) {
  const ref = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    updateProductType_(ref.current.value);
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
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductType_: (type) => {
      return dispatch(updateProductType(type));
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);

//https://api.themoviedb.org/3/search/multi?api_key=f4b964a7e615c3824313f9121ff9270d&language=en-US&query=The%20Wire&page=1&include_adult=false
