import React from 'react';

import FilterGroup from './FilterGroup.jsx';

function clone(object) {
  return JSON.parse( JSON.stringify(object) );
}


function Header(props) {
  return (
    <div className="filter-page-bar filter-page-header">
      <div className="container">
        <a className="close-button" onClick={props.onClose}>
          <i className="material-icons">close</i>
        </a>
        <a className="clearall-button" onClick={props.onClearAll}>
          {'Clear All'}
        </a>
      </div>
    </div>
  );
}

function SubmitBar(props) {
  return (
    <div className="filter-page-bar filter-submit-bar">
      <a className="filter-submit-button btn-flat waves-effect waves-light" onClick={props.onClick}>
        {'Apply Filters'}
      </a>
    </div>
  );
}

class FilterPageMobile extends React.Component {

  constructor() {
    super(...arguments);

    this.cleared = {};
    
    const filterNames = Object.keys(this.props.filtersDict);
    filterNames.forEach(f => this.cleared[f] = []);

    this.state = { selectedFilters: clone(this.cleared) };
  }

  // Clear filters and load unfiltered groups page when first mounted
  componentDidMount() {
    this.props.handleFilterToggle( clone(this.cleared) );
  }

  onClearAll = () => {
    this.setState({ selectedFilters: clone(this.cleared) });
  }

  onClose = () => {
    this.setState({ selectedFilters: clone(this.props.startingFilters) });
    this.props.handleClose();
  }

  onSubmit = () => {
    this.props.handleFilterToggle( clone(this.state.selectedFilters) );
    this.props.handleClose();
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

FilterPageMobile.propTypes = {
  showFilters:        React.PropTypes.bool.isRequired,
  filtersDict:        React.PropTypes.object.isRequired,
  startingFilters:    React.PropTypes.object.isRequired,
  handleFilterToggle: React.PropTypes.func.isRequired,
  handleClose:        React.PropTypes.func.isRequired,
};


module.exports = FilterPageMobile;
