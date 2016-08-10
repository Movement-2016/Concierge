/* eslint react/prefer-stateless-function: off */
import React from 'react';
import GroupPlan from './GroupPlan.jsx';

export default class StateGroupPlan extends React.Component {
  render () {
    let groups = [];
    for (let group of this.props.groups) {
      let amount = '0';
      let given = false;
      for (const donation of this.props.donations) {
        if (donation.group === group.id) {
          amount = donation.amount;
          given = donation.given;
          break;
        }
      }

      groups.push (
        <GroupPlan
          key={group.id}
          group={group}
          amount={amount}
          onPlannedChanged={this.props.onPlannedChanged}
          given={given}
          onGivenChanged={this.props.onGivenChanged}
          registerRef={this.props.registerRef}
          onNextField={this.props.onNextField}
          onPreviousField={this.props.onPreviousField}
        />
      );
    }

    return (
      <div className='stateGroupPlan' id={this.props.groups[0].state}>
        <h3 className={this.props.groups[0].color}>
          {this.props.groups[0].state}
        </h3>
        {groups}
      </div>
    );
  }
}

StateGroupPlan.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

StateGroupPlan.propTypes = {
  groups: React.PropTypes.array.isRequired,
  donations: React.PropTypes.array.isRequired,
  onPlannedChanged: React.PropTypes.func.isRequired,
  onGivenChanged: React.PropTypes.func.isRequired,
  registerRef: React.PropTypes.func.isRequired,
  onNextField: React.PropTypes.func.isRequired,
  onPreviousField: React.PropTypes.func.isRequired,
};
