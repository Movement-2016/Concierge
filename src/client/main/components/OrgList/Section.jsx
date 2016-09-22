import React from 'react';

import Group from './Group.jsx';

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
      <div className="grouping scrollspy" id={`${name}-states`}>
        <div className={`grouping-title ${name}-states-title`}>{label}</div>
        <div className="section-groups collapse in" id={this.grpsId}>
          {Object.keys(groups).map( s => <Group key={s} {...allGroups[s]} items={groups[s]} />)}
        </div>
      </div>
      );
  }
}

module.exports = Section;