import React from 'react';
import { Link } from 'react-router';


const Footer = () => {

  const ccStyle = { borderWidth: 0 };

  return (
    <footer className="site-footer footer-area container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="partners panel">
            <div className="panel-heading">National Partners</div>
            <div className="pnael-body">
              <ul className="partner-logos clearfix">
                <li>
                  <a href="http://workingfamilies.org/" target="_blank"><img src="/images/partner-logos/working-families-logo.png" /></a>
                </li>
                <li>
                  <a href="http://busfedaction.org/" target="_blank"><img src="/images/partner-logos/bus-federation-logo.png" /></a>
                </li>
                <li>
                  <a href="http://peoplesaction.org/" target="_blank"><img src="/images/partner-logos/peoples-action-logo.png" /></a>
                </li>
                <li>
                  <a><img src="/images/partner-logos/student-power-logo.png" /></a>
                </li>
                <li>
                  <a><img src="/images/partner-logos/lacafe.png" /></a>
                </li>
                <li>
                  <a href="http://powerpac.org/"><img src="/images/partner-logos/powerpac@0,5x.png" /></a>
                </li>
                <li>
                  <a href="http://cpdaction.org/" target="_blank"><img src="/images/partner-logos/cpd-logo.png" /></a>
                </li>
                <li>
                  <a href="http://dailykos.com/" target="_blank"><img src="/images/partner-logos/dailykos-logo@0,5x.png" /></a>
                </li>
                <li>
                  <a href="http://www.cccaction.org/" target="_blank"><img src="/images/partner-logos/ccca-logo@0,5x.png" /></a>
                </li>
              </ul>
            </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="links clearfix panel">
          <div className="panel-heading">Site Links</div>
          <div className="panel-body">
            <ul className="site-links">
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/getintouch">Contact</Link></li>
              <li><a href="https://github.com/movement-2016">@GitHub</a></li>
              <li><a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">License</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="license clearfix" />
  </footer>
  );
};

module.exports = Footer;