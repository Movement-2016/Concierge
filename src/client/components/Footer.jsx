import React from 'react';

import PartnerLogos from './PartnerLogos.jsx';
import Menu from './Menu.jsx';

const Footer = ({ menu }) => (
  <footer className="site-footer">
    <div className="partner-logo-section" id="partners">
      <div className="partners-title">{'National Partners'}</div>
      <PartnerLogos />
    </div>
    {menu && <Menu menu={menu} className="footer-menu nav-menu" />}
  </footer>
);

module.exports = Footer;
