import React from 'react';
import { ServiceContext } from './ContextMixins';

class Section extends React.Component {
  render() {
    const {
      section,
      states
    } = this.props;

    return (
      <div className="section">
        <div className="sectionHead">{section.label}</div>
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
      sections
    } = this.state.service;

    return (
        <div className="groups">
          {sections.map( s => <Section key={s.section.name} {...s} />)}
        </div>
      );
  }
}

module.exports = Groups;