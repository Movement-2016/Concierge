import React from 'react';
import { connect } from 'react-redux';
import Sticky from 'react-stickynode';
import { cleanHtml } from '../lib/helperFunctions';

import Org from './Orgs/OrgBasic.jsx';
import DonateLink from './DonateLink.jsx';

const FundDonateTile = ({ fund }) => (
  <div className="tile fund-tile">
    <div className="tile-image" style={{ backgroundImage: `url("${fund.image}")` }} />
    <div className="tile-body">
      <div className="tile-label">{fund.title}</div>
      <div className="tile-description">{fund.fundDescriptionShort}</div>
      <DonateLink url={fund.fundUrl}>{'Donate Now'}</DonateLink>
    </div>
  </div>
);

const FundGroups = ({ mobile, fund, groups }) => {
  const fundGroups = groups.filter(g => fund.fundGroups.includes(g.id));

  // Sort groups alphabetically by state name & group name
  fundGroups.sort((a, b) => {
    const nameA = a.statename.toUpperCase();
    const nameB = b.statename.toUpperCase();
    if (nameA === nameB) {
      return a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1;
    }
    return nameA < nameB ? -1 : 1;
  });

  return (
    <div className="fund-groups">
      {fundGroups.map((g, i) => <Org key={i} mobile={mobile} {...g} />)}
    </div>
  );
};

const FundContent = ({ mobile, fund, groups }) => (
  <div className="fund-content">
    <div className="fund-intro">
      <div className="fund-intro-title">{'Why Your Donation Matters'}</div>
      <div
        className="fund-intro-text"
        dangerouslySetInnerHTML={{ __html: cleanHtml(fund.fundIntro) }}
      />
    </div>
    <div className="fund-groups-sentence">{'The ' + fund.title + ' supports these groups:'}</div>
    <FundGroups mobile={mobile} fund={fund} groups={groups} />
  </div>
);

const FundAction = ({ mobile, fund, stickyTileBottom }) => (
  <div className="fund-action">
    {mobile ? (
      <DonateLink className="fund-donate-button" url={fund.fundUrl}>
        {'Donate Now'}
        <i className="material-icons">{'chevron_right'}</i>
      </DonateLink>
    ) : (
      <Sticky top={40} bottomBoundary={stickyTileBottom}>
        <FundDonateTile fund={fund} />
      </Sticky>
    )}
  </div>
);

const _FundPage = ({ mobile, slug, funds, groups }) => {
  const fund = funds.find(el => el.slug === slug);

  return (
    <main className="fund-page">
      <div className="container">
        <h1 className="page-title">{fund.title}</h1>
        <div className="fund-page-body">
          <FundContent mobile={mobile} fund={fund} groups={groups} />
          <FundAction mobile={mobile} fund={fund} stickyTileBottom=".fund-page" />
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

module.exports = { FundPage, FundContent, FundAction };
