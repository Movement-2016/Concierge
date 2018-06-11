import React from 'react';
import { connect } from 'react-redux';

const _FundPage = ({ slug, funds, groups }) => (
  <div>Test content</div>
);

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
