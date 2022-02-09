import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterCenter() {
  return (
    <section className="flex-col">
      <header>About</header>
      <a
        style={{ textDecoration: 'none', width: 'max-content', color: 'grey' }}
        className="footer-link"
        href="https://github.com/RohanMangroo"
      >
        Github
      </a>
      <a
        style={{ textDecoration: 'none', width: 'max-content', color: 'grey' }}
        className="footer-link"
        href="https://www.linkedin.com/in/seeram-rohan-mangroo/"
      >
        LinkedIn
      </a>
    </section>
  );
}
