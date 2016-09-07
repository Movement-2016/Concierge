import React from 'react';
import { ServiceContext } from './ContextMixins';


class Section extends React.Component {
  render() {
    const {
      name,
      label,
      states
    } = this.props;

    return (
      <div className="section">
        <div className="sectionHead">{label}</div>
      </div>
      );
  }
}

class Groups extends ServiceContext(React.Component) {

  constructor() {
    super(...arguments);

  }

  render() {
    const {
      groupSections,
      orgs
    } = this.state.service;

    return (
        <div className="groups">
          {Object.keys(groupSections).map( name => <Section key={name} {...groupSections[name]} states={orgs[name]} />)}
        </div>
      );
  }
}

module.exports = Groups;