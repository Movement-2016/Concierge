import React from 'react';

export default class Checkbox extends React.Component {
  render() {
    return (
      <div className='customcb'>
        <input type='checkbox' id={this.props.id}
          checked={this.props.checked}
          onChange={(e) => this.props.onChange (this.props.index, e.target.checked)}/>
        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  checked: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired
}
