import React from 'react';
import { connect } from 'react-redux';
import striptags from 'striptags';

import Link from '../services/LinkToRoute';

const FundTile = ({ slug, label, url, image, description }) => (
  <div className="fund-tile">
    <div className="tile-image" style={{ backgroundImage: `url("${image}")` }} />
    <div className="tile-body">
      <div className="tile-label">
        {label} <i className="material-icons">{'chevron_right'}</i>
      </div>
      <div className="tile-description">{description}</div>
      <a className="donate-button" to={url} target="_blank">
        {'Donate Now'}
      </a>
      <Link className="about-fund-button" to={'/funds/' + slug}>
        {'About the groups in this fund'}
        <i className="material-icons">{'chevron_right'}</i>
      </Link>
    </div>
  </div>
);

const _FundsPage = ({ title, body, linkText, funds }) => (
  <main className="funds-page">
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      <div className="page-intro">
        <p>{striptags(body)}</p>
        <Link to="/about/#our-process">
          {linkText} <i className="material-icons">{'chevron_right'}</i>
        </Link>
      </div>
    </div>
    <div className="container">
      <div className="fund-tiles">
        <div className="row">
          {funds.map((fund, i) => (
            <div key={i} className="col s12 m4">
              <FundTile
                label={fund.title}
                slug={fund.slug}
                url={fund.fundUrl}
                image={fund.image}
                description={fund.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
);

const mapStoreToProps = ({
  router: {
    target: {
      model: {
        funds,
        page: { title, body, fundPageLinkText: linkText },
      },
    },
  },
}) => ({ title, body, linkText, funds });

const FundsPage = connect(mapStoreToProps)(_FundsPage);

module.exports = FundsPage;
