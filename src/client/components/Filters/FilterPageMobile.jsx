import React from 'react';
import { connect } from 'react-redux';
import FilterGroup from './FilterGroup.jsx';

import { setVisibility } from '../../../shared/store/actions/groups';

import { clone } from '../../../shared/lib/general-utils';

const Header = ({ onClose, onClearAll }) =>
    <div className="filter-page-bar filter-page-header">
      <div className="container">
        <a className="close-button" onClick={onClose}>
          <i className="material-icons">{'close'}</i>
        </a>
        <a className="clearall-button" onClick={onClearAll}>
          {'Clear All'}
        </a>
      </div>
    </div>
;

const SubmitBar = ({onClick}) => 
    <div className="filter-page-bar filter-submit-bar">
      <a className="filter-submit-button btn-flat waves-effect waves-light" onClick={onClick}>
        {'Apply Filters'}
      </a>
    </div>
;

class _FilterPageMobile extends React.Component {

  constructor() {
    super(...arguments);

    this.cleared = [];
    this.state = { selectedFilters: clone(this.cleared) };
  }

  // Clear filters and load unfiltered groups page when first mounted
  componentDidMount() {
    this.props.setVisibility( [...this.cleared] );
  }

  onClearAll = () => {
    this.setState({ selectedFilters: [...this.cleared] });
  }

  onClose = () => {
    this.setState({ selectedFilters: [...this.props.startingFilters] });
    this.props.handleClose();
  }

  onSubmit = () => {
    const {
      setVisibility,
      handleClose
    } = this.props;

    setVisibility( [...this.state.selectedFilters] );
    handleClose();
  }

  onFilterChange = (term) => {

    let selectedFilters = this.state.selectedFilters;

    const index = selectedFilters.indexOf(term);
    if( index === -1 ) {
      selectedFilters.push(term);
    } else {
      selectedFilters.splice(index,1);
    }

    this.setState({ selectedFilters });
  }

  render() {
    const {
      showFilters,
      filterCategories
    } = this.props;

    const onFilterChange = this.onFilterChange;

    return (
      <div className={'filter-page' + (showFilters ? ' visible' : '')}>
        <Header onClearAll={this.onClearAll} onClose={this.onClose} />
          <div className="filters">
            <div className="container">
              {filterCategories.map( ({id,name,slug}) => <FilterGroup key={id} {...{slug,id,name,onFilterChange}}  /> )}
            </div>
          </div>
        <SubmitBar onClick={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = ({
  router: {
    target: {
      model: {
        db
      }
    }
  },
  groups: { 
    visibility, 
  }
}) => ({
    filterCategories: db.tagCategories,
    showOrgsNav: db.visibleGroups(visibility).length > 0
  });

const mapDispatchToProps = { setVisibility };

const FilterPageMobile = connect( mapStateToProps, mapDispatchToProps )(_FilterPageMobile);

module.exports = FilterPageMobile;
