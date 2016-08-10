/* eslint react/prefer-stateless-function: off */
import React from 'react';
import Group from './Group.jsx';
import { toggleGroup } from '../store/actions.js';

export default class StateGroup extends React.Component {
  render () {
    let groups = [];
    for (let group of this.props.groups) {
      groups.push (
        <Group
          key={`${group.id}${group.favorite ? 'F' : ''}`}
          group={group}
          onClick={(id) => {
            this.context.store.dispatch (toggleGroup (id));
          }}
        />
      );
    }

    return (
      <div className='stateGroup' id={this.props.groups[0].state}>
        <h3 className={this.props.groups[0].color}>
          {this.props.groups[0].state}
        </h3>
        {groups}
      </div>
    );
  }
}

StateGroup.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

StateGroup.propTypes = {
  groups: React.PropTypes.array.isRequired,
};
