import React from 'react';

import { 
  ServiceContext,
  ContextMixin 
} from './ContextMixins';

import { toggleItem } from '../store/actions';

class Item extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    
    this.state = {
      selected: false
    };
    
    this.onItemClick = this.onItemClick.bind(this);

    this.filters = this.context.store.getState().service.filterDict;
  }

  shouldComponentUpdate() {
    return this.state.selected !== this._isSelected();
  }
  
  onItemClick(e) {
    e.preventDefault();
    this.context.store.dispatch( toggleItem(this.props.id) );
  }

  stateFromStore(storeState) {
    if( this.state.selected !== this._isSelected(storeState) ) {
      this.setState( { selected: !this.state.selected });  
    }    
  }

  _isSelected( storeState ) {
    const { groups } = storeState || this.context.store.getState();
    return groups.selected.includes(this.props.id);
  }

  render() {
    const {
      name,
      urlWeb,
      urlGive,
      description,
      tags,
      group
    } = this.props;

    const {
      selected
    } = this.state;

    const text = selected ? 'Remove from plan' : 'Add to plan';
    const cls  = selected ? 'selected' : '';

    return(
        <div className={`item ${group} ${cls}`}>
          <div className="name"><span dangerouslySetInnerHTML={{__html:name}} /></div>
          <div className="linksArea">
            {urlWeb && <a className="imgLink" href={urlWeb} target="_blank" rel="noopener noreferrer"><img src="/images/ic_link_red_24dp.png" alt="" /><span> Website</span></a>}
            {urlGive && <a className="imgLink" href="#" onClick={this.onItemClick}><img src="/images/ic_star_border_red_24dp.png" alt="" /><span> {text}</span></a>}
          </div>
          <div className="orgTypeArea">
            {tags.map( t => <span key={t}>{this.filters[t]}</span> )}
          </div>
          <div className="descriptionArea">{description}</div>
        </div>
      );
  }
}

class Group extends React.Component {

  render() {

    const {
      name,
      label,
      items,
      group
    } = this.props;

    return (
        <div className="group" id="name">
          <a name={name} />
          <h3 className={group}>{label}</h3>
          {items.map( o => <Item key={o.id} {...o} />)}
        </div>
      );
  }
}

class Section extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor() {
    super(...arguments);

    this.state = {
      expanded: true
    };

    this.grpsId = 'section-groups-' + this.props.name;
    this.hashId = '#' + this.grpsId;
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

  render() {
    const {
      name,
      label,
      groups
    } = this.props;

    const {
      expanded
    } = this.state;

    const allGroups = this.context.store.getState().service.groupings.terms;

    const toggle = expanded ? 'minus' : 'plus';

    return (
      <div className="section" id={name}>
        <a name={name} />
        <a data-toggle="collapse" data-target={this.hashId}>
          <div className="sectionHead">
            <span className={`sectionToggle glyphicon glyphicon-${toggle}`} />
            {label}
          </div>
        </a>
        <div className="sectionGroups collapse in" id={this.grpsId}>
          {Object.keys(groups).map( s => <Group key={s} {...allGroups[s]} items={groups[s]} />)}
        </div>
      </div>
      );
  }
}

function getVisiableSections(allSections,orgs) {
  const visible = {};
  Object.keys(orgs).forEach( section => visible[section] = allSections[section] );
  return visible;
}

class OrgsList extends ServiceContext(React.Component) {

  render() {
    const {
      groupSections,
    } = this.state.service;

    const {
      orgs
    } = this.props;

    const sections = getVisiableSections(groupSections,orgs);

    return (
        <div className="groupsArea">
          {Object.keys(sections).map( name => <Section key={name} {...groupSections[name]} groups={orgs[name]} />)}
        </div>
      );
  }
}

module.exports = OrgsList;