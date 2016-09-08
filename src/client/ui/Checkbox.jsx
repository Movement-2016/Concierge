import React from 'react';

export default class Checkbox extends React.Component {

  render() {
    const {
      id,
      checked,
      label,
      onChange
    } = this.props;

    return (
      <div className='customcb'>
        <input type='checkbox' id={id}
          checked={checked}
          onChange={e => onChange (e.target.checked)}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired
};
