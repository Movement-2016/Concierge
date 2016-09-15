import React     from 'react';

import { ContextMixin } from '../ContextMixins';

import { setProfile } from '../../../account/store/actions';

class ProfileInput extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
    this.state = { value: '' };
  }

  stateFromStore(storeState) {
    const { user } = storeState;
    const { name } = this.props;
    if( user[name] !== this.value ) {
      this.setState({ value: user[name] });
    }
  }
  
  onChange(e) {
    const { value } = e.target;
    const { name } = this.props;
    this.context.store.dispatch( setProfile( { [name]: value }) );
  }

  render() {
    const { name, placeholder } = this.props;
    const { value } = this.state;

    return (
        <input name={name} type="text" onChange={this.onChange} placeholder={placeholder} value={value} /> 
      );
  }
}

module.exports = ProfileInput;
