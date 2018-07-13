import React from 'react';
import { connect } from 'react-redux';
import Sticky from 'react-stickynode';
import { cleanHtml } from '../lib/helperFunctions';

import Org from './Orgs/OrgBasic.jsx';
import DonateLink from './DonateLink.jsx';

const FundTile = ({ label, url, image, description }) => (
  <div className="tile fund-tile">
    <div className="tile-image" style={{ backgroundImage: `url("${image}")` }} />
    <div className="tile-body">
      <div className="tile-label">{label}</div>
      <DonateLink url={url}>{'Donate Now'}</DonateLink>
      <div className="tile-description">{description}</div>
    </div>
  </div>
);

const _FundPage = ({ mobile, slug, funds, groups }) => {
  let fund;
  funds.some(f => f.slug === slug && (fund = f));
  const fundGroups = groups.filter(g => fund.fundGroups.includes(g.id));

  fundGroups.sort((a, b) => {
    const nameA = a.statename.toUpperCase();
    const nameB = b.statename.toUpperCase();
    if (nameA === nameB) {
      return a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1;
    }
    return nameA < nameB ? -1 : 1;
  });

  const tileProps = {
    image: fund.image,
    label: fund.title,
    description: fund.fundDescriptionShort,
    url: fund.fundUrl,
  };

  return (
    <main className="fund-page">
      <div className="container">
        <h1 className="page-title">{fund.title}</h1>
        <div id="fund-page-body">
          <div className="fund-content">
            <div className="fund-intro">
              <div className="fund-intro-title">{'About This Fund'}</div>
              <div
                className="fund-intro-text"
                dangerouslySetInnerHTML={{ __html: cleanHtml(fund.fundIntro) }}
              />
            </div>
            <div className="fund-groups-sentence">
              {'The ' + fund.title + ' supports these groups:'}
            </div>
            <div className="fund-groups">
              {fundGroups.map((g, i) => <Org key={i} mobile={mobile} {...g} />)}
            </div>
          </div>
          <div className="fund-action">
            {mobile ? (
              <DonateLink className="fund-donate-button" url={fund.fundUrl}>
                {'Donate Now'}
                <i className="material-icons">{'chevron_right'}</i>
              </DonateLink>
            ) : (
              <Sticky top={40} bottomBoundary="#fund-page-body">
                <FundTile {...tileProps} />
              </Sticky>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStoreToProps = ({
  router: {
    route: {
      params: { slug },
    },
    target: {
      model: { funds, groups },
    },
  },
}) => ({ slug, funds, groups });

const FundPage = connect(mapStoreToProps)(_FundPage);

module.exports = FundPage;
