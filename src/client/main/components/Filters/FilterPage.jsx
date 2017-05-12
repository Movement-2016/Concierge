import React from 'react';

import { ServiceContext } from '../ContextMixins';
import FilterGroup from './FilterGroup.jsx';

function Header(props) {
  return (
    <Headroom disableInlineStyles>
      <div className="filter-page-header">
        <div className="container">
          <a className="close-button" onClick={props.onClose}>
            <i className="material-icons">close</i>
          </a>
          <a className="clearall-button" onClick={props.onClearAll}>
            {'Clear All'}
          </a>
        </div>
      </div>
    </Headroom>
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

    // deep clone props.selected to avoid mutating object
    const initialSelected = JSON.parse( JSON.stringify( this.props.selected ) );

    this.state = {
      selected: initialSelected
    };

    this.filterNames = Object.keys(this.props.selected);
  }

  onClearAll = () => {
    var cleared = {};
    this.filterNames.map(f => cleared[f] = []);
    this.setState({ selected: cleared });
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

    this.setState({ selected: selected });
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
