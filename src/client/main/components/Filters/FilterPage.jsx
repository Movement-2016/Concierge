import React from 'react';

import { ServiceContext } from '../ContextMixins';
import FilterGroup from './FilterGroup.jsx';

function Header(props) {
  return (
    <div className="filter-page-header">
      <a className="close-button" onClick={props.onClose}>
        <i className="material-icons">close</i>
      </a>
      <a className="clearall-button" onClick={props.onClearAll}>
        {'Clear All'}
      </a>
    </div>
  );
}

function SubmitBar(props) {
  return (
    <div className="submit-bar">
      <a className="filter-submit-button btn-flat waves-effect waves-light" onClick={props.onClick}>
        {'View Groups'}
      </a>
    </div>
  );
}

class FilterPage extends ServiceContext(React.Component) {

  constructor(props) {
    super(props);

    const { selected } = this.props;

    this.state = {
      selected: selected
    };

    this.cleared = {};
    for (var cat in selected) {
      this.cleared[cat] = [];
    }

    this.filterNames = Object.keys(this.props.selected);
  }

  onClearAll = () => {
    this.setState({ selected: this.cleared });
  }

  onSubmit = () => {
    this.props.handleFilterToggle( this.state.selected );
  }

  onFilterChange = (category, term, addFilter) => {
    var selected = this.state.selected;
    console.log('selected 1:', selected );

    if ( selected[category] ) {
      const index = selected[category].indexOf(term);
      addFilter
        ? (index === -1) && selected[category].push(term)
        : (index > -1) && selected[category].splice(index, 1);
    }
    console.log('selected 2:', selected );

    this.setState({ selected });
  }

  render() {
    const { groupFilters: filters } = this.service;

    return (
      <main className="filter-page">
        <Header onClearAll={this.onClearAll} onClose={this.props.onClose} />
        <div className="filters">
          {this.filterNames.map( f => {
            const filterGroupProps = {
              selected:       this.state.selected,
              onFilterChange: this.onFilterChange,
              name:           f,
              label:          filters[f].label,
              terms:          filters[f].terms
            };
            return <FilterGroup key={f} {...filterGroupProps} />
          }
          )}
        </div>
        <SubmitBar onClick={this.onSubmit} />
      </main>
      );
  }
}

FilterPage.propTypes = {
  selected:           React.PropTypes.object.isRequired,
  handleFilterToggle: React.PropTypes.func.isRequired,
  onClose:            React.PropTypes.func.isRequired,
};


module.exports = FilterPage;
