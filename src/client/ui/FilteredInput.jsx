import React from 'react';
import ReactDOM from 'react-dom';

export default class FilteredInput extends React.Component {
  render () {
    return (
      <input {...this.props}
        onKeyPress={(e) => {
          if (this.props.filter.test (e.key) === false) {
            e.preventDefault ();
          }
        }
      }/>
    );
  }
}

FilteredInput.PropTypes = {
  filter: React.PropTypes.object.isRequired
}
