import React from 'react';
import { connect } from 'react-redux';

import Link from '../../services/LinkToRoute';
import Headroom from 'react-headroom';

import OrgsList from './OrgsList.jsx';
import FilterPageMobile from '../Filters/FilterPageMobile.jsx';
import PlanTray from './PlanTray.jsx';

const FilterBar = ({ showFilter, onShowFilters, numFilters }) => (
  <div className="filter-bar-wrapper">
    <Headroom disableInlineStyles>
      <div className="filter-bar">
        <div className="container">
          <Link className="navigate-button" to="/groups">
            <i className="material-icons">{'chevron_left'}</i>
            {'Navigate'}
          </Link>
          {showFilter && (
            <a className="filter-button" onClick={onShowFilters}>
              <i className="material-icons">{'filter_list'}</i>
              {'Filter' + (numFilters ? ` (${numFilters})` : '')}
            </a>
          )}
        </div>
      </div>
    </Headroom>
  </div>
);

class _OrgsPageMobile extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showOrgsList: true,
    };
  }

  onShowOrgsList = () => {
    this.setState({ showOrgsList: true });
  };

  onShowFilters = () => {
    this.setState({ showOrgsList: false });
  };

  render() {
    const { showOrgsList } = this.state;

    const { numGroups, numFilters, showFilter } = this.props;

    return (
      <main className="orgs-page orgs-page-mobile">
        <FilterBar
          showFilter={showFilter}
          numFilters={numFilters}
          onShowFilters={this.onShowFilters}
        />
        {showOrgsList && <OrgsList mobile />}
        <PlanTray numGroups={numGroups} />
        <FilterPageMobile showFilters={!showOrgsList} handleClose={this.onShowOrgsList} />
      </main>
    );
  }
}

const mapStateToProps = ({
  groups: { filters, selected },
  router: {
    route: {
      params: { slug },
    },
    target: {
      model: { db },
    },
  },
}) => ({
  numGroups: selected.length,
  numFilters: filters.length,
  showFilter: db.visibleGroups(filters, slug).length > 1 || filters.length,
});

const OrgsPageMobile = connect(mapStateToProps)(_OrgsPageMobile);

module.exports = OrgsPageMobile;
