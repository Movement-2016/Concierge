import React from 'react';

import Org from './Org.jsx';

import CollapseMixin from '../CollapseMixin';

class State extends CollapseMixin(React.Component) {

  get collapsibleSelector() {
    return '#' + this.props.name + '-list';
  }

  render() {

    const {
      name,
      label,
      items,
      group:color
    } = this.props;

    const {
      expanded
    } = this.state;

    const cls = expanded ? 'open' : 'closed';

    return (
        <div className="state" id={name}>
          <div onClick={this.onToggleCollapse} className={`expand-trigger state-title ${cls} ${color}-state`}>
            <h4>
              <span className="state-name">{this.expandIcon} {label}</span>
              <i className="material-icons color-icon">turned_in</i>
            </h4>
          </div>
          <div id={name + '-list'} className="collapse">
            {expanded && items.map( o => <Org key={o.id} {...o} />)}
          </div>
        </div>
      );
  }
}


module.exports = State;