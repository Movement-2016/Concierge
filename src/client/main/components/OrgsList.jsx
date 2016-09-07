import React from 'react';
import { ServiceContext } from './ContextMixins';

class Item extends React.Component {

  render() {
    const {
      name,
      urlWeb,
      urlGive,
      description,
      tags
    } = this.props;

    return(
        <div className="item">
          <div className="name"><span dangerouslySetInnerHTML={{__html:name}} /></div>
          <div className="linksArea">
            {urlWeb && <a className="imgLink" href={urlWeb} target="_blank" rel="noopener noreferrer"><img src="/images/ic_link_red_24dp.png" alt="" /><span> Website</span></a>}
            {urlGive && <a className="imgLink" href={urlGive} target="_blank" rel="noopener noreferrer"><img src="/images/ic_star_border_red_24dp.png" alt="" /><span> Contribute</span></a>}
          </div>
          <div className="orgTypeArea">
            {tags.map( t => <span key={t}>{t}</span> )}
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
      color // ugh
    } = this.props;

    return (
        <div className="group" id="name">
          <a name={name} />
          <h3 className={color}>{label}</h3>
          {items.map( (o,i) => <Item key={i} {...o} />)}
        </div>
      );
  }
}

class Section extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  render() {
    const {
      name,
      label,
      groups
    } = this.props;

    const allGroups = this.context.store.getState().service.groupings.terms;

    return (
      <div className="section" id={name}>
        <a name={name} />
        <div className="sectionHead">{label}</div>
        <div className="sectionGroups">
          {Object.keys(groups).map( s => <Group key={s} {...allGroups[s]} items={groups[s]} />)}
        </div>
      </div>
      );
  }
}

class OrgsList extends ServiceContext(React.Component) {

  constructor() {
    super(...arguments);

  }

  render() {
    const {
      groupSections,
      orgs
    } = this.state.service;

    return (
        <div className="groupsArea">
          {Object.keys(groupSections).map( name => <Section key={name} {...groupSections[name]} groups={orgs[name]} />)}
        </div>
      );
  }
}

module.exports = OrgsList;