import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterCenter() {
  return (
    <section className="flex-col">
      <header>About</header>
      <a className="about-link" href="https://github.com/RohanMangroo">
        <span>Github</span>
      </a>
      <a href="https://www.linkedin.com/in/seeram-rohan-mangroo/">
        <span>LinkedIn</span>
      </a>
    </section>
  );
}
