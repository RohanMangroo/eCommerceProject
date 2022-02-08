import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/modal.css';
import { BiError } from 'react-icons/bi';
import { BsFillBagCheckFill } from 'react-icons/bs';

export default function Modal({ modalClass, error, toggle, total, cancel }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '7px';
  }, []);

  if (error === 'checkout') {
    return ReactDOM.createPortal(
      <div className={`modal center-items`}>
        <CheckoutModal
          message={error}
          toggle={toggle}
          modalClass={modalClass}
          total={total}
          cancel={cancel}
        />
      </div>,
      document.getElementById('modal')
    );
  }
  return ReactDOM.createPortal(
    <div className={`modal center-items`}>
      <Error error={error} toggle={toggle} modalClass={modalClass} />
    </div>,
    document.getElementById('modal')
  );
}

function CheckoutModal({ message, toggle, modalClass, total, cancel }) {
  function clickHandler(event) {
    toggle();
    event.stopPropagation();
  }

  const gotItems = total === '0.00' ? false : true;

  let toRender;

  if (gotItems) {
    toRender = (
      <div className="flex-col checkout-message">
        <span className="cart-total-modal">{`$${total}`}</span>
      </div>
    );
  } else {
    toRender = (
      <div className="flex-col checkout-message">
        <span className="empty-cart">Empty Cart</span>
      </div>
    );
  }

  return (
    <div className={`modal-checkout flex-col ${modalClass}`}>
      <div className="modal-icon-container center-items">
        <BsFillBagCheckFill className="error-icon" />

        <button className="cancel" onClick={cancel}>
          X
        </button>
      </div>

      {toRender}

      {gotItems && (
        <button className="btn confirm" onClick={clickHandler}>
          C O N F I R M
        </button>
      )}
    </div>
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
        <span>Wrong wrong! wrong!!</span>
      </div>
    );
  else
    toRender = (
      <div className="error-message flex-col">
        <span>Error!</span>
        <span>{`${error}?? What the heck is that?`}</span>
      </div>
    );

  return (
    <div className={`modal-error flex-col ${modalClass}`}>
      <div className="error-icon-container center-items">
        <BiError className="error-icon" />
      </div>

      {toRender}
      <button className="btn" onClick={(event) => clickHandler(event)}>
        CLOSE
      </button>
    </div>
  );
}
