import React from 'react';
import { connect } from 'react-redux';

import Link from '../../services/LinkToRoute';
import Headroom from 'react-headroom';


import OrgsList from './OrgsList.jsx';
import FilterPageMobile from '../Filters/FilterPageMobile.jsx';
import PlanTray from './PlanTray.jsx';

import { setVisibility } from '../../../shared/store/actions/groups';

const FilterBar = ({ onShowFilters }) =>
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
              {'Filter'}
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
      visibility,
      selectedGroups,
      groupFilters,
      setVisibility
    } = this.props;

    return (
      <main className="orgs-page orgs-page-mobile">
        <FilterBar onShowFilters={this.onShowFilters} />
        <OrgsList mobile />
        <PlanTray numGroups={selectedGroups.length}/>
        <FilterPageMobile
          showFilters={!showOrgsList}
          filtersDict={groupFilters}
          startingFilters={visibility}
          handleFilterToggle={visibility => setVisibility( visibility )}
          handleClose={this.onShowOrgsList}
        />
      </main>
    );
  }
}

const mapStateToProps = ({ 
        groups: { 
          visibility, 
          selected: selectedGroups,
        },
        router: {
          target: {
            model: {
              groupFilters
            },            
          },
        }
      }) => 
        ({
          visibility,
          selectedGroups,
          groupFilters
        });

const mapDispatchToProps = { setVisibility };

const OrgsPageMobile = connect( mapStateToProps, mapDispatchToProps )(_OrgsPageMobile);

module.exports = OrgsPageMobile;
