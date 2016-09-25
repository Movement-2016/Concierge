import React from 'react';

import State from './State.jsx';

class ColorGroup extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  render() {
    const {
      name,
      label,
      states
    } = this.props;

    const allStates = this.context.store.getState().service.groupings.terms;

    return (
      <div className="grouping scrollspy" id={`${name}-states`}>
        <div className={`grouping-title ${name}-states-title`}>{label}</div>
        <div className="section-groups collapse in" id={this.grpsId}>
          {Object.keys(states).map( s => <State key={s} {...allStates[s]} items={states[s]} />)}
        </div>
      </div>
      );
  }
}

module.exports = ColorGroup;