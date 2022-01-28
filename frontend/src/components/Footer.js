import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <div className="footer flex-row">
      <section className="flex-col">
        <header>My Account</header>
        <span>My Account</span>
        <span>Order History</span>
        <span>Wish List</span>
      </section>
      <section className="flex-col">
        <header>About</header>
        <span>Github</span>
        <span>LinkedIn</span>
      </section>
      <section className="center-items">
        <div className="flex-col">
          <header>Powered By</header>
          <span>The Movie Database API</span>
          <span>React / Redux</span>
          <span>Node / Express</span>
        </div>
      </section>
    </div>
  );
}
