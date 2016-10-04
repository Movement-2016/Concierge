import React from 'react';

import { ContextMixin } from '../ContextMixins';

import { setProfile } from '../../../account/store/actions';

class RequestConsult extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = { value: false };
    this.onChecked = this.onChecked.bind(this);
  }

  stateFromStore(storeState) {
    const value = storeState.user.wantsConsult;
    this.setState({ value });
  }
  
  onChecked(e) {
    const { value } = e.target;
    this.context.store.dispatch( setProfile( { wantsConsult: !value }) );
  }

  render() {
    const { value } = this.state;

    return(
      <div className="consult-request">
        <input type="checkbox" name="consult-request" id="consult-request" value={value} onChange={this.onChecked} />
        <label htmlFor="consult-request">Request a consultation with a donation advisor</label>
      </div>
      );
  }
}
module.exports = RequestConsult;


