import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.css';
import { BiError } from 'react-icons/bi';

export default function Modal({ modalClass, error, toggle }) {
  return ReactDOM.createPortal(
    <div className={`modal center-items`}>
      <Error error={error} toggle={toggle} modalClass={modalClass} />
    </div>,
    document.getElementById('modal')
  );
}

function Error({ error, toggle, modalClass }) {
  function clickHandler(event) {
    toggle();
    event.stopPropagation();
  }
  let toRender;
  if (error === 'Bad Username') {
    toRender = (
      <div className="error-message flex-col">
        <span>Error!</span>
        <span>Sorry, That Usename Is Taken</span>
      </div>
    );
  } else if (error === 'No User Found')
    toRender = (
      <div className="error-message flex-col">
        <span>Error!</span>
        <span>Sorry, No User Found</span>
      </div>
    );

  return (
    <div className={`modal-error flex-col ${modalClass}`}>
      <div className="error-icon-container center-items">
        <BiError className="error-icon" />
      </div>

      {toRender}
      <button className="btn" onClick={(event) => clickHandler(event)}>
        Close
      </button>
    </div>
  );
}
