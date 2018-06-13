import React from 'react';
import { connect } from 'react-redux';
import striptags from 'striptags';

import DonateLink from './DonateLink.jsx';

import Link from '../services/LinkToRoute';

const FundTile = ({ slug, label, url, image, description }) => (
  <div className="tile fund-tile">
    <div className="tile-image" style={{ backgroundImage: `url("${image}")` }} />
    <div className="tile-body">
      <div className="tile-label">{label}</div>
      <div className="tile-description">{description}</div>
      <DonateLink url={url}>{'Donate Now'}</DonateLink>
      <Link className="more-link about-fund-button" to={'/funds/' + slug}>
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
      <div className="container">
        <div className="page-intro">
          <p>{striptags(body)}</p>
          <Link to="/about/#our-process">
            {linkText}
            <i className="material-icons">{'chevron_right'}</i>
          </Link>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="fund-tiles">
        {funds.map((fund, i) => (
          <FundTile
            key={i}
            label={fund.title}
            slug={fund.slug}
            url={fund.fundUrl}
            image={fund.image}
            description={fund.fundDescriptionShort}
          />
        ))}
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
