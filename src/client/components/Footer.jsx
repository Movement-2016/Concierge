import React from 'react';

import PartnerLogos from './PartnerLogos.jsx';
import Menu from './Menu.jsx';

const Footer = ({ menu }) => (
  <footer className="site-footer">
    <section className="menu-section">
      {menu && <Menu menu={menu} id="footer-menu" className="nav-menu" />}
    </section>
    <section className="partner-logo-section" id="partners">
      <div className="partners-title">{'National Partners'}</div>
      <PartnerLogos />
    </section>
  </footer>
);

module.exports = Footer;
