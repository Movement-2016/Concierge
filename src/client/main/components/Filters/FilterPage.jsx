import React from 'react';

import { ContextFromService } from '../ContextMixins';
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
        {'View Groups'}
      </a>
    </div>
  );
}

class FilterPage extends ContextFromService(React.Component) {

  get servicePropNames() {
    return ['groupFilters'];
  }

  constructor(props) {
    super(props);

    this.cleared = {};
    this.filterNames = Object.keys(this.props.selectedFilters);
    this.filterNames.map(f => this.cleared[f] = []);

    this.state = {
      selected: clone(this.cleared)
    };
  }

  componentDidMount() {
    this.props.handleFilterToggle( this.state.selected );
  }

  cleared = () => {
    this.filterNames.map(f => this.cleared[f] = []);
  }

  onClearAll = () => {
    this.setState({ selected: clone(this.cleared) });
  }

  onSubmit = () => {
    this.props.handleFilterToggle( this.state.selected );
    this.props.onClose();
  }

  onFilterChange = (category, term, addFilter) => {

    const selected = this.state.selected;

    if ( selected[category] ) {
      const index = selected[category].indexOf(term);
      addFilter
        ? (index === -1) && selected[category].push(term)
        : (index > -1) && selected[category].splice(index, 1);
    }

    this.setState({ selected });
  }

  render() {
    const {
      groupFilters: filters,
      loading
    } = this.state;

    if (loading) {
      return <span />
    }

    return (
      <div className={'filter-page' + (this.props.showFilters ? ' visible' : '')}>
        <Header onClearAll={this.onClearAll} onClose={this.props.onClose} />
          <div className="filters">
            <div className="container">
              {this.filterNames.map( f => {
                const filterGroupProps = {
                  selectedFilters:  this.state.selected,
                  onFilterChange:   this.onFilterChange,
                  name:             f,
                  label:            filters[f].label,
                  terms:            filters[f].terms
                };
                return <FilterGroup key={f} {...filterGroupProps} />
              }
              )}
            </div>
          </div>
        <SubmitBar onClick={this.onSubmit} />
      </div>
      );
  }
}

FilterPage.propTypes = {
  selectedFilters:    React.PropTypes.object.isRequired,
  handleFilterToggle: React.PropTypes.func.isRequired,
  onClose:            React.PropTypes.func.isRequired,
};


module.exports = FilterPage;
