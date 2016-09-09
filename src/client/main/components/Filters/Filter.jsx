import React from 'react';

import {apply as path}  from 'jspath';

import Checkbox from '../../../ui/Checkbox.jsx';

const FilterCheckbox = ({ label, name, cat, onTermsChecked, selected }) => {
  return (
    <Checkbox
      id={name}
      checked={selected[cat].includes(name)}
      onChange={checked => onTermsChecked (cat, [name], checked)}
      label={label}
    />
  );
};

class Filter extends React.Component {

  constructor() {  
    super(...arguments);
    this.state = {
      expanded: false
    };
    
    const { name } = this.props;

    this.optsId = 'filter-opts-' + name;
    this.hashId = '#' + this.optsId;

    this.onAll   = this.onAll.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentDidMount() {
    /* globals $ */
    $(this.hashId)
      .on('show.bs.collapse', () => this.setState( {expanded:true} ) )
      .on('hide.bs.collapse', () => this.setState( {expanded:false} ) );
  }

  componenWillUnmount() {
    $(this.hashId)
      .off('show.bs.collapse')
      .off('hide.bs.collapse');
  }

  onAll() {
    this._sendSelected(false);
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
    const { expanded } = this.state;

    const {      
      label,
      name,
      terms
    } = this.props;

    const toggle = expanded ? 'minus' : 'plus';

    return (
        <div className={`filter ${name}`} >
          <div className="filter-header">
            <a data-toggle="collapse" data-target={this.hashId}>
              <span className={`filterTitleToggle glyphicon glyphicon-${toggle}`} />
              <span className="filterTitleName">{label}</span>
            </a>
            { expanded && <button className="filterTitleButton" onClick={this.onAll}>All</button> }
            { expanded && <button className="filterTitleButton" onClick={this.onClear}>Clear</button> }
          </div>
          <div className="filterGroup collapse out" id={this.optsId}>
            {Object.keys(terms).map( t => <FilterCheckbox {...this.props} {...terms[t]} key={t} cat={name}  /> )}
          </div>
        </div>
      );
  }
}

module.exports = Filter;