import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../../styles/userMenu.css';
import { toggleHam } from '../../store/hamMenuReducer';
import { connect } from 'react-redux';

function HamburgerIcon({ toggleHam_, ham }) {
  function handleClick(event) {
    toggleHam_(!ham.open);
  }
  return (
    <div onClick={handleClick} className="hamburger-menu-container">
      <GiHamburgerMenu className="ham-icon" />
    </div>
  );
}

const mapStateToProps = ({ ham }) => {
  return {
    ham,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHam_: (boolean) => {
      return dispatch(toggleHam(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerIcon);
