import React from 'react';
import FooterCenter from './FooterCenter';
import FooterRight from './FooterRight';
import '../../styles/footer.css';

export default function Footer() {
  return (
    <div className="footer flex-row">
      <FooterCenter />
      <FooterRight />
    </div>
  );
}
