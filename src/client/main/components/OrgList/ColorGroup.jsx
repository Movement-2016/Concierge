import React from 'react';

import State from './State.jsx';

import CollapseMixin from '../CollapseMixin';

class ColorGroup extends CollapseMixin(React.Component) {

  get collapsibleSelector() {
    return '#' + this.props.name + '-states-list';
  }

  render() {
    const {
      slug:name,
      name:label,
      states,
      selected,
      store,
      groupDict,
      filters
    } = this.props;

    const {
      expanded
    } = this.state;

    const allStates = expanded && groupDict;

    const id = name;

    const cls = expanded ? 'open' : 'closed';
    const sel = `expand-trigger grouping-title ${cls} ${id}-title`;

    return (
      <div className="grouping scrollspy" id={id}>
        <div onClick={this.onToggleCollapse} className={sel}>{this.expandIcon} {label}</div>
        <div className="section-groups collapse" id={id + '-list'}>
          {expanded && Object.keys(states).map( s => <State key={s} 
                                                            {...allStates[s]} 
                                                            selected={selected} 
                                                            store={store}
                                                            color={name} 
                                                            filters={filters}
                                                            items={states[s]} 
                                                     />)}
        </div>
      </div>
      );
  }
}

module.exports = ColorGroup;