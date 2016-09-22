import React from 'react';

import path  from 'jspath';


const FilterCheckbox = ({ label, name, cat, onTermsChecked, selected, disabled }) => {

  const checked = selected[cat].includes(name);

  const cProps = {
    type:      'checkbox',
    className: `filter-checkbox ${selected ? 'filled-in' : ''}`,
    id:        'checkbox-' + name,
    onChange:   () => onTermsChecked (cat, [name], !checked),
    checked,
    disabled
  };

  return (
    <div className={`filter ${disabled ? 'disabled' : ''}`}>
      <input {...cProps} /> <label htmlFor={cProps.id}>{label}</label>
    </div>
  );
};

class Filter extends React.Component {

  constructor() {  
    super(...arguments);

    this.state = { 
      seeAll: true,
    };

    this.onAll   = this.onAll.bind(this);
  }

  onAll() {
    const seeAll = !this.state.seeAll;
    this.setState({ seeAll });
    seeAll && this._sendSelected(seeAll);
  }

  _sendSelected(seeAll) {
    const { 
      terms, 
      name,
      onTermsChecked 
    } = this.props;

    const names = path('..name', terms );
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

    const cls = 'filter-checkbox ' + (seeAll ? 'filled-in' : '');
    const id  = `checkbox-${name}-see-all`;

    return (
      <li className={`filter-group ${name}-filters`}>
          <div className="collapsible-header"><span className="toggle"/>{label}</div>
          <div className="collapsible-body" style={{display:'none'}}>
            <div className="filter" key="all">
                <input type="checkbox" ref="seeAll" className={cls} id={id} checked={seeAll} onChange={this.onAll} />
                <label htmlFor={id}>See All</label>
            </div>
            {Object.keys(terms).map( t => <FilterCheckbox {...this.props} {...terms[t]} key={t} cat={name} disabled={seeAll} /> )}
          </div>
      </li>
    );
  }
}

module.exports = Filter;