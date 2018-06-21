import React from 'react';
import { connect } from 'react-redux';
import FilterGroup from './FilterGroup.jsx';

import { filterClear } from '../../../shared/store/actions/groups';

const Header = ({ onClose, onClearAll, showClearAll }) => (
  <div className="filter-page-bar filter-page-header">
    <div className="container">
      <a className="close-button" onClick={onClose}>
        <i className="material-icons">{'arrow_back'}</i>
      </a>
      {showClearAll && (
        <a className="clearall-button" onClick={onClearAll}>
          {'Clear All'}
        </a>
      )}
    </div>
  </div>
);

// const SubmitBar = ({onClick}) =>
//     <div className="filter-page-bar filter-submit-bar">
//       <a className="filter-submit-button btn-flat waves-effect waves-light" onClick={onClick}>
//         {'See Results'}
//       </a>
//     </div>
// ;

class _FilterPageMobile extends React.Component {
  // Clear filters and load unfiltered groups page when first mounted
  componentDidMount() {
    this.props.filterClear();
  }

  onClearAll = () => {
    this.props.filterClear();
  };

  onClose = () => {
    this.props.handleClose();
  };

  onSubmit = () => {
    this.props.handleClose();
  };

  render() {
    const { showFilters, filterCategories, visibleFilters, nothingSelected } = this.props;

    return (
      <div className={'filter-page' + (showFilters ? ' visible' : '')}>
        <Header
          showClearAll={!nothingSelected}
          onClearAll={this.onClearAll}
          onClose={this.onClose}
        />
        <div className="filters">
          <div className="container">
            {filterCategories.map(({ id, name, slug }) => (
              <FilterGroup key={id} {...{ slug, id, name, visibleFilters }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

//         <SubmitBar onClick={this.onSubmit} />

const mapStateToProps = ({
  groups: { filters },
  router: {
    target: {
      model: { db },
    },
    route: {
      params: { slug, allGroups = slug === 'all-groups' },
    },
  },
}) => ({
  filterCategories: db.getRecords(
    'tagCategories',
    db.visibleCategories(!allGroups && slug, filters)
  ),
  visibleFilters: db.visibleFilters(!allGroups && slug, filters),
  nothingSelected: !filters.length,
});

const mapDispatchToProps = { filterClear };

const FilterPageMobile = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FilterPageMobile);

module.exports = FilterPageMobile;
