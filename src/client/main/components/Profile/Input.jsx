import React     from 'react';

import { ContextFromStore } from '../ContextMixins';

import { setProfile } from '../../../account/store/actions';

class ProfileInput extends ContextFromStore(React.Component) {

  constructor() {
    super(...arguments);
    this.state = { value: '' };
    this.onChange = this.onChange.bind(this);
  }

  stateFromStore(storeState) {
    const { user } = storeState;
    const { name } = this.props;
    if( user[name] !== this.state.value ) {
      this.setState({ value: user[name] });
    }
  }

  onChange(e) {
    const { value } = e.target;
    const { name } = this.props;
    this.context.store.dispatch( setProfile( { [name]: value }) );
  }

  render() {


    const { value } = this.state;


    const eProps = {
      onChange: this.onChange,
      value,
      ...this.props
    };

    return <input {...eProps} />;

  }
}

ProfileInput.defaultProps = {
  type: 'text'
};

module.exports = ProfileInput;
