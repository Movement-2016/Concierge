import React from 'react';
import { connect } from 'react-redux';

import Org from './Orgs/OrgBasic.jsx';
import DonateLink from './DonateLink.jsx';

import Link from '../services/LinkToRoute';

const FundTile = ({label, url, image, description }) => (
  <div className="tile fund-tile">
    <div className="tile-image" style={{ backgroundImage: `url("${image}")` }} />
    <div className="tile-body">
      <div className="tile-label">{label}</div>
      <DonateLink url={url}>{'Donate Now'}</DonateLink>
      <div className="tile-description">{description}</div>
      <Link to="/about/#our-process">
        {'Learn more about our process'}
        <i className="material-icons">{'chevron_right'}</i>
      </Link>
    </div>
  </div>
);

const _FundPage = ({ mobile, slug, funds, groups }) => {
  let fund;
  funds.some( f => {
    if (f.slug === slug) {
      fund = f;
      return true;
    }
    return false;
  });
  const tileProps = {
    image: fund.image,
    label: fund.title,
    description: fund.fundDescriptionLong,
    url: fund.fundUrl,
  };
  const fundGroups = groups.filter( g => fund.fundGroups.includes(g.id) );

  return (
    <main className="fund-page">
      <div className="container">
        <div className="page-header">
          <FundTile {...tileProps} />
        </div>
        <div className="page-body">
          <div className="page-intro">
            {'Your donation to the ' + tileProps.label + ' supports these groups:'}
          </div>
          <div className="fund-groups">
            {fundGroups.map( (g, i) => <Org key={i} mobile={mobile} {...g} /> )}
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStoreToProps = ({
  router: {
    route: {
      params: {
        slug
      }
    },
    target: {
      model: {
        funds,
        groups
      },
    },
  },
}) => ({ slug, funds, groups });

const FundPage = connect(mapStoreToProps)(_FundPage);

module.exports = FundPage;