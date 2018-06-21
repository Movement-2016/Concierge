import React from 'react';
import { connect } from 'react-redux';

import { setProfile } from '../../../shared/store/actions/profile';

class _ProfileInput extends React.Component {
  constructor() {
    super(...arguments);
    const { profile, name } = this.props;
    this.state = { value: profile[name] };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    const { name, setProfile } = this.props;

    setProfile({ [name]: value });
  }

  render() {
    const { profile, name } = this.props;

    const value = profile[name] || '';

    const eProps = {
      onChange: this.onChange,
      value,
      ...this.props,
    };

    ['profile', 'setProfile'].forEach(p => eProps[p] && delete eProps[p]);

    return <input {...eProps} />;
  }
}

_ProfileInput.defaultProps = {
  type: 'text',
};

const mapStateToProps = ({ profile }) => ({ profile });
const mapDispatchToProps = { setProfile };

const ProfileInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProfileInput);

module.exports = ProfileInput;
