import React from 'react';
import { connect } from 'react-redux';

import Link from '../../services/LinkToRoute';
import Headroom from 'react-headroom';


import OrgsList from './OrgsList.jsx';
import FilterPageMobile from '../Filters/FilterPageMobile.jsx';
import PlanTray from './PlanTray.jsx';

import { setVisibility } from '../../../shared/store/actions/groups';

const FilterBar = ({ onShowFilters, numFilters }) =>
    <div className="filter-bar-wrapper">
      <Headroom disableInlineStyles>
        <div className="filter-bar">
          <div className="container">
            <Link className="navigate-button" to="/groups">
              <i className="material-icons">{'chevron_left'}</i>
              {'Navigate'}
            </Link>
            <a className="filter-button" onClick={onShowFilters}>
              <i className="material-icons">{'filter_list'}</i>
              {'Filter' + (numFilters ? ` (${numFilters})` : '')}
            </a>
          </div>
        </div>
      </Headroom>
    </div>;


class _OrgsPageMobile extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      showOrgsList: true
    };
  }

  onShowOrgsList = () => {
    this.setState({ showOrgsList: true });
  }

  onShowFilters = () => {
    this.setState({ showOrgsList: false });
  }

  render() {

    const {
      showOrgsList
    } = this.state;

    const {
      numGroups,
      numFilters
    } = this.props;

    return (
      <main className="orgs-page orgs-page-mobile">
        <FilterBar numFilters={numFilters} onShowFilters={this.onShowFilters} />
        {showOrgsList && <OrgsList mobile />}
        <PlanTray numGroups={numGroups}/>
        <FilterPageMobile
          showFilters={!showOrgsList}
          handleClose={this.onShowOrgsList}
        />
      </main>
    );
  }
}

const mapStateToProps = ({ 
        groups: { 
          selected,
          visibility
        }
      }) => 
        ({
          numGroups: selected.length,
          numFilters: visibility.length
        });

const mapDispatchToProps = { setVisibility };

const OrgsPageMobile = connect( mapStateToProps, mapDispatchToProps )(_OrgsPageMobile);

module.exports = OrgsPageMobile;
