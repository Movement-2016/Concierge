import React from 'react';

import path  from 'jspath';


const FilterCheckbox = ({ label, name, cat, onTermsChecked, selected, seeAll }) => {

  const checked = selected[cat].includes(name);

  const cProps = {
    type:      'checkbox',
    className: `filter-checkbox ${selected ? 'filled-in' : ''}`,
    id:        'checkbox-' + name,
    onChange:   checked => onTermsChecked (cat, [name], checked),
    checked
  };

  return (
    <div className={`filter ${seeAll ? 'see-all-mode' : ''}`}>
      <input {...cProps} /> <label htmlFor={cProps.id}>{label}</label>
    </div>
  );
};

class Filter extends React.Component {

  constructor() {  
    super(...arguments);
    const { name, expanded = false} = this.props;

    this.state = { 
      expanded, 
      seeAll: true,
    };

    this.optsId = 'filter-opts-' + name;
    this.hashId = '#' + this.optsId;

    this.onAll   = this.onAll.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentWillReceiveProps(props) {
    const { expanded } = props;
    this.setState({ expanded });
  }

  onAll(e) {
    const seeAll = e.target.value === 'true';
    this.setState({ seeAll });
    this._sendSelected(seeAll);
  }

  onClear() {
    this._sendSelected(true);
  }

  _sendSelected(clear) {
    const { 
      terms, 
      name,
      onTermsChecked 
    } = this.props;

    const names = path('..name', terms );
    onTermsChecked( name, names, !clear );
  }

  render() {
    const { 
      expanded,
      seeAll,
    } = this.state;

    const {      
      label,
      name,
      terms,
    } = this.props;

    const toggle = expanded ? '-' : '+';
    const cls    = 'filter-checkbox ' + (seeAll ? 'filled-in' : '');
    const id     = `checkbox-${name}-see-all`;

    return (
      <li className={`filter-group ${name}-filters`}>
          <div className="collapsible-header" onClick={this.toggleExpanded}><span>{toggle}</span>{label}</div>
          <div className="collapsible-body" style={{display:'none'}}>
            <div className="filter" key="all">
                <input type="checkbox" ref="seeAll" className={cls} id={id} value={seeAll} onChange={this.onAll} />
                <label htmlFor={id}>See All</label>
            </div>
            {Object.keys(terms).map( t => <FilterCheckbox {...this.props} {...terms[t]} key={t} cat={name} seeAll={seeAll} /> )}
          </div>
      </li>
    );
  }
}

module.exports = Filter;