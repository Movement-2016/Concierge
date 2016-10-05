import React from 'react';

import State from './State.jsx';

import CollapseMixin from '../CollapseMixin';

class ColorGroup extends CollapseMixin(React.Component) {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  get collapsibleSelector() {
    return '#' + this.props.name + '-states-list';
  }

  render() {
    const {
      name,
      label,
      states
    } = this.props;

    const {
      expanded
    } = this.state;

    const allStates = expanded && this.context.store.getState().service.groupings.terms;

    const id = name + '-states';

    const cls = expanded ? 'open' : 'closed';

    return (
      <div className="grouping scrollspy" id={id}>
        <div onClick={this.onToggleCollapse} className={`expand-trigger grouping-title ${cls} ${id}-title`}>{this.expandIcon} {label}</div>
        <div className="section-groups collapse" id={id + '-list'}>
          {expanded && Object.keys(states).map( s => <State key={s} {...allStates[s]} items={states[s]} />)}
        </div>
      </div>
      );
  }
}

module.exports = ColorGroup;