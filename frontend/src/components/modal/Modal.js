import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.css';
import { BiError } from 'react-icons/bi';

export default function Modal({ error, toggle }) {
  return ReactDOM.createPortal(
    <div className="modal center-items">
      <Error error={error} toggle={toggle} />
    </div>,
    document.getElementById('modal')
  );
}

function Error({ error, toggle }) {
  let toRender;
  if (error === 'Bad Username') {
    toRender = (
      <div className="error-message flex-col">
        <span>Sorry, That Usename Is Taken</span>
        <span>Please Choose Another</span>
      </div>
    );
  } else if (error === 'No User Found')
    toRender = (
      <div className="error-message flex-col">
        <span>Sorry, No User Found</span>
        <span>Please Choose Another</span>
      </div>
    );

  return (
    <div className="modal-error flex-col">
      <BiError className="error-icon" />
      {toRender}
      <button className="btn" onClick={toggle}>
        Close
      </button>
    </div>
  );
}
