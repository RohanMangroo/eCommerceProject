import React from 'react';
import { Link } from 'react-router-dom';
import { useViewport } from '../../components/customHooks';
import { updateProductType } from '../../store/productsReducer';
import { connect } from 'react-redux';

function Logo({ updateProductType_ }) {
  const { width } = useViewport();

  const value = width <= 414 ? 'C' : 'C E N I M A S';
  const responsiveClass = width <= 414 ? 'resp-class' : '';

  function handleClick() {
    updateProductType_('movie');
  }
  return (
    <Link
      onClick={handleClick}
      className={`movie-go-title ${responsiveClass}`}
      to="/"
    >
      <span>{value}</span>
    </Link>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductType_: (type) => {
      return dispatch(updateProductType(type));
    },
  };
};

export default connect(null, mapDispatchToProps)(Logo);
