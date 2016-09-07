import React from 'react';
import path  from 'jsonpath-plus';

import { ServiceContext } from './ContextMixins';

import Checkbox from '../../ui/Checkbox.jsx';

const FilterCheckbox = ({ label, name, onTermsChecked, selected }) => {
  return (
    <Checkbox
      id={name}
      index={1}
      checked={selected.includes(name)}
      onChange={(index, checked) => onTermsChecked ([name], checked)}
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
      selected,
      onTermsChecked 
    } = this.props;

    const names = path('$.[*].name', terms );
    const clean = selected.filter(t => !names.includes(t));
    onTermsChecked( clear ? clean : [ ...clear, ...names ] );
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
            { expanded && <button className="filterTitleButton" onClick={this.onCliear}>Clear</button> }
          </div>
          <div className="filterGroup collapse out" id={this.optsId}>
            {Object.keys(terms).map( t => <FilterCheckbox key={t} {...this.props} {...terms[t]}  /> )}
          </div>
        </div>
      );
  }
}

const ScrollLink = ({ name, label }) => {
  return <a href={'#' + name}>{label}</a>;
};

const ScrollLinks = ({ links }) => {
  const keys = Object.keys(links);
  const { name } = links[keys[0]];
  return(
      <div className="filterGroup">
        <ScrollLink name={name} label="Top" />
        {keys.map( k => <ScrollLink key={k} {...links[k]} /> )}
      </div>
    );
};

const Groupings = ({ terms, onShowGroup }) => {
  return (
      <select onChange={e => onShowGroup(e.target.value)}>
        {Object.keys(terms).map( k => <option key={k} value={terms[k].name}>{terms[k].label}</option>)}
      </select>
    );
};

class Filters extends ServiceContext(React.Component) {

  constructor() {
    super(...arguments);
  }

  render() {
    const { 
      filters, 
      groupings:{terms},
      groupSections 
    } = this.state.service;

    const { 
      onShowGroup,
      onShowSection } = this.props;

    return (
        <div className="groupSelectorArea">
          <h4>Filter by</h4>
          {Object.keys(filters).map( f => <Filter key={f} {...this.props} {...filters[f]} /> )}
          <h4>Go to...</h4>
          <ScrollLinks links={groupSections} onShowSection={onShowSection} />
          <Groupings terms={terms} onShowGroup={onShowGroup} />
        </div>
      );
  }
}

Filters.propTypes = {
  selected:       React.PropTypes.arrayOf (React.PropTypes.string).isRequired,
  onTermsChecked: React.PropTypes.func.isRequired,
  onShowGroup:    React.PropTypes.func.isRequired,
  onShowSection:  React.PropTypes.func.isRequired
};


module.exports = Filters;