import React from 'react';

import path  from 'jspath';


const FilterCheckbox = ({ label, name, cat, onTermsChecked, selected, disabled }) => {

  const checked = selected[cat].includes(name);

  const cProps = {
    type:      'checkbox',
    className: `filter-checkbox ${selected ? 'filled-in' : ''}`,
    id:        'checkbox-' + name,
    onChange:   () => onTermsChecked (cat, [name], !checked),
    checked:    !disabled && checked,
  };

  return (
    <div className="filter">
      <input {...cProps} /> <label htmlFor={cProps.id}>{label}</label>
    </div>
  );
};

class FilterMode extends React.Component {

  render() {

    const { 
      name,
      id,
      checked,
      onChange,
      text
    } = this.props;

    const cls       = 'filter-checkbox filled-in';
    const domid     = `checkbox-${name}-${id}`;

    return( 
      <div>
        <input type="checkbox" className={cls} id={domid} checked={checked} onChange={onChange} />
        <label htmlFor={domid}>{text}</label>
      </div>
      );
  }
}

class Filter extends React.Component {

  constructor() {  
    super(...arguments);

    const { 
      terms
    } = this.props;

    this._allFilter = path('..name', terms ).join(',');

    this.state = { 
      filterValue: this._allFilter
    };

    this.onToggleAll    = this.onToggleAll.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(e) {
    const filterValue = e.target.value;
    this.setState({ filterValue },this._sendSelected());
  }

  _sendSelected(seeAll) {
    const { 
      name,
      onTermsChecked 
    } = this.props;

    const {
      filterValue
    } = this.state;

    const names = filterValue.split(/,/);
    onTermsChecked( name, names, seeAll );
  }


  render() {
    const { 
      seeAll,
    } = this.state;

    const {      
      label,
      name,
      terms,
    } = this.props;

    return (
      <li className={`filter-group ${name}-filters`}>
          <div className="collapsible-header"><span className="toggle"/>{label}</div>
          <div className="collapsible-body" style={{display:'none'}}>
            <div className="filter" key="all">
              <FilterMode name={name} checked={seeAll}  onChange={this.onToggleAll} id='all'  text="See All" />
            </div>
            <div onChange={this.onFilterChange} >
              {Object.keys(terms).map( t => <FilterCheckbox {...this.props} {...terms[t]} key={t} cat={name} disabled={seeAll} /> )}
            </div>
          </div>
      </li>
    );
  }
}

module.exports = Filter;