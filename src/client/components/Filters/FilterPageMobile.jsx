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

    this.cleared = {};

    const filterNames = Object.keys(this.props.filtersDict);
    filterNames.forEach(f => this.cleared[f] = []);

    this.state = { selectedFilters: clone(this.cleared) };
  }

  // Clear filters and load unfiltered groups page when first mounted
  componentDidMount() {
    this.props.setVisibility( clone(this.cleared) );
  }

  onClearAll = () => {
    this.setState({ selectedFilters: clone(this.cleared) });
  }

  onClose = () => {
    this.setState({ selectedFilters: clone(this.props.startingFilters) });
    this.props.handleClose();
  }

  onSubmit = () => {
    const {
      setVisibility,
      handleClose
    } = this.props;

    setVisibility( clone(this.state.selectedFilters) );
    handleClose();
  }

  onFilterChange = (category, term, addFilter) => {

    const selectedFilters = this.state.selectedFilters;

    if ( selectedFilters[category] ) {
      const index = selectedFilters[category].indexOf(term);
      addFilter
        ? (index === -1) && selectedFilters[category].push(term)
        : (index > -1) && selectedFilters[category].splice(index, 1);
    }

    this.setState({ selectedFilters });
  }

  render() {
    const {
      showFilters,
      filtersDict
    } = this.props;

    return (
      <div className={'filter-page' + (showFilters ? ' visible' : '')}>
        <Header onClearAll={this.onClearAll} onClose={this.onClose} />
          <div className="filters">
            <div className="container">
              {Object.keys(filtersDict).map( f => {
                const filterGroupProps = {
                  selectedFilters:  this.state.selectedFilters,
                  onFilterChange:   this.onFilterChange,
                  name:             f,
                  label:            filtersDict[f].label,
                  terms:            filtersDict[f].terms
                };
                return <FilterGroup key={f} {...filterGroupProps} />;
              }
              )}
            </div>
          </div>
        <SubmitBar onClick={this.onSubmit} />
      </div>
    );
  }
}

_FilterPageMobile.propTypes = {
  showFilters:        React.PropTypes.bool.isRequired,
  filtersDict:        React.PropTypes.object.isRequired,
  startingFilters:    React.PropTypes.object.isRequired,
  handleClose:        React.PropTypes.func.isRequired,
};

const mapDispatchToProps = { setVisibility };

const FilterPageMobile = connect( null, mapDispatchToProps )(_FilterPageMobile);

module.exports = FilterPageMobile;
