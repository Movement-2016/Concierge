import React     from 'react';
import { connect } from 'react-redux';

import {
  setProfile
} from '../../../shared/store/actions/profile';

class _ProfileInput extends React.Component {

  constructor() {
    super(...arguments);
    this.state = { value: this.props.user[this.props.name] };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    const { name } = this.props;
    this.props.setProfile( { [name]: value } );
  }

  render() {

    const {
      user,
      name
    } = this.props;

    const value = user[name] || '';

    const eProps = {
      onChange: this.onChange,
      value,
      ...this.props
    };

    ['store','user', 'setProfile' ].forEach( p => eProps[p] && (delete eProps[p]) );
    
    return <input {...eProps} />;

  }
}

_ProfileInput.defaultProps = {
  type: 'text'
};

const mapStateToProps = s => ({ user: s.profile });
const mapDispatchToProps = { setProfile };

const ProfileInput = connect(mapStateToProps,mapDispatchToProps)(_ProfileInput);

module.exports = ProfileInput;
