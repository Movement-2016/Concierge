import React from 'react';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';

import Link from '../services/LinkToRoute';

const cleanHtml = dirty =>
  sanitizeHtml(dirty, {
    allowedTags: ['p', 'br'],
  });

const FundTile = ({ slug, label, image, description }) => {
  const link = slug === 'puertorico' ? `/${slug}` : `/funds/${slug}`;
  return (
    <Link className="tile fund-tile" to={link}>
      <div className="tile-image" style={{ backgroundImage: `url("${image}")` }} />
      <div className="tile-body">
        <div className="tile-label">
          {label}
          <i className="material-icons">{'chevron_right'}</i>
        </div>
        <div className="tile-description">{description}</div>
      </div>
    </Link>
  );
};

const _FundsPage = ({ title, body, linkText, funds, image }) => (
  <main className="funds-page">
    <div className="page-header" style={{ backgroundImage: `url(${image})` }}>
      <h1 className="page-title">{title}</h1>
    </div>
    <div className="page-intro">
      <div className="container">
        <div className="intro-content" dangerouslySetInnerHTML={{ __html: cleanHtml(body) }} />
        <Link to="/faq">
          {linkText}
          <i className="material-icons">{'chevron_right'}</i>
        </Link>
      </div>
    </div>
    <section className="funds-section">
      <h2 className="section-title">{'Choose A Fund'}</h2>
      <div className="container">
        <div className="fund-tiles">
          {funds.map(
            (fund, i) =>
              fund.fundDisplay && (
                <FundTile
                  key={i}
                  label={fund.title}
                  slug={fund.slug}
                  url={fund.fundUrl}
                  image={fund.image}
                  description={fund.fundDescriptionShort}
                />
              )
          )}
        </div>
      </div>
    </section>
  </main>
);

const mapStoreToProps = ({
  router: {
    target: {
      model: {
        funds,
        page: { title, body, fundPageLinkText: linkText, image },
      },
    },
  },
}) => ({ title, body, linkText, funds, image });

const FundsPage = connect(mapStoreToProps)(_FundsPage);

module.exports = FundsPage;
