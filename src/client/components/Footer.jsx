import React from 'react';
import Link from '../services/LinkToRoute';

const Footer = () => {
  return (
    <footer className="site-footer">
      <section className="partner-logo-section" id="partners">
        <div className="partners-title">National Partners</div>
        <ul className="partner-logos">
          <li className="partner-logo wf-logo">
            <a href="http://workingfamilies.org" target="_blank"><img src="/images/partner-logos/working-families-logo.png" /></a>
          </li>
          <li className="partner-logo afya-logo">
            <a href="https://www.allianceforyouthaction.org/" target="_blank"><img src="/images/partner-logos/afya-logo.png" /></a>
          </li>
          <li className="partner-logo peoples-action-logo">
            <a href="http://peoplesaction.org" target="_blank"><img src="/images/partner-logos/peoples-action-logo@0,5x.png" /></a>
          </li>
          <li className="partner-logo studentpower-logo">
            <a href="https://studentpower.us" target="_blank"><img src="/images/partner-logos/studentpower-logo@0,5x.png" /></a>
          </li>
          <li className="partner-logo lacafe-logo">
            <a><img src="/images/partner-logos/lacafe@0,5x.png" /></a>
          </li>
          <li className="partner-logo powerpac-logo">
            <a href="http://powerpac.org"><img src="/images/partner-logos/powerpac@0,5x.png" /></a>
          </li>
          <li className="partner-logo cpd-logo">
            <a href="http://cpdaction.org" target="_blank"><img src="/images/partner-logos/cpd-logo.png" /></a>
          </li>
          <li className="partner-logo dailykos-logo">
            <a href="http://dailykos.com" target="_blank"><img src="/images/partner-logos/dailykos-logo@0,5x.png" /></a>
          </li>
          <li className="partner-logo ccca-logo">
            <a href="http://www.cccaction.org/" target="_blank"><img src="/images/partner-logos/ccca-logo@0,5x.png" /></a>
          </li>
          <li className="partner-logo paf-logo">
            <a href="http://www.piconetwork.org/" target="_blank"><img src="/images/partner-logos/paf-logo@0,5x.png" /></a>
          </li>
          <li className="partner-logo courage-logo">
            <a href="https://www.couragecampaign.org/" target="_blank"><img src="/images/partner-logos/courage-logo@0,5x.png" /></a>
          </li>
          <li className="partner-logo dfa-logo">
            <a href="http://democracyforamerica.com/" target="_blank"><img src="/images/partner-logos/dfa-logo@0,5x.png" /></a>
          </li>
        </ul>
      </section>
      <section className="links-section">
        <ul className="site-links">
          <li><a to="https://secure.actblue.com/privacy">Privacy</a></li>
          <li><Link to="/getintouch">Contact</Link></li>
          <li><a href="https://github.com/movement-2016">@GitHub</a></li>
          <li><a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">License</a></li>
        </ul>
      </section>
    </footer>
  );
};

module.exports = Footer;
