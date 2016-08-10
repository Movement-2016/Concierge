import React from 'react';

export default class GroupPlan extends React.Component {
  render () {
    let tags = '';
    if (this.props.group.tags.indexOf ('501c3') !== -1) { tags += '501c3 '; }
    if (this.props.group.tags.indexOf ('501c4') !== -1) { tags += '501c4 '; }
    if (this.props.group.tags.indexOf ('pac') !== -1) { tags += 'pac '; }
    if (tags.length > 0) {
      tags = `(${tags.substr (0, tags.length - 1)})`;
    }

    return (
      <div className='groupPlan'>
        <div className='namePlan'>
          {this.props.group.name} <span className='tagsPlan'>{tags}</span>
        </div>
        <div className='givingArea'>
          <label htmlFor={`amount${this.props.group.id}`}>$</label>
          <input
            type='text'
            id={`amount${this.props.group.id}`}
            ref={ref => { this.props.registerRef (this.props.group.id, ref); }}
            value={this.props.amount}
            onKeyUp={(e) => {
              if (e.key === 'ArrowDown') {
                this.props.onNextField (this.props.group.id);
              } else if (e.key === 'ArrowUp') {
                this.props.onPreviousField (this.props.group.id);
              }
            }}
            onFocus={() => {
              this.props.onPlannedChanged (this.props.group.id,
                this.props.amount.replace (/,/g, ''));
            }}
            onBlur={() => {
              this.props.onPlannedChanged (this.props.group.id,
                this.props.amount.replace (/\B(?=(\d{3})+\b)/g, ','));
            }}
            onChange={(e) => {
              this.props.onPlannedChanged (this.props.group.id, e.target.value);
            }}
          />
          <input
            type='checkbox'
            checked={this.props.given}
            onChange={(e) => {
              this.props.onGivenChanged (this.props.group.id, e.target.checked);
            }}
          />
        </div>
      </div>
    );
  }
}

GroupPlan.propTypes = {
  group: React.PropTypes.object.isRequired,
  amount: React.PropTypes.string.isRequired,
  onPlannedChanged: React.PropTypes.func.isRequired,
  given: React.PropTypes.bool.isRequired,
  onGivenChanged: React.PropTypes.func.isRequired,
  registerRef: React.PropTypes.func.isRequired,
  onNextField: React.PropTypes.func.isRequired,
  onPreviousField: React.PropTypes.func.isRequired,
};
