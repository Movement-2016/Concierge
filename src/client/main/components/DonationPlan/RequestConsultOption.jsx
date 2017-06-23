import React from 'react';

import { setProfile } from '../../../account/store/actions';

class RequestConsultOption extends React.Component {

  constructor() {
    super(...arguments);
    this.state = { value: false };
    this.onChecked = this.onChecked.bind(this);
  }

  onChecked(e) {
    const { value } = e.target;
    this.props.store.dispatch( setProfile( { wantsConsult: !value }) );
  }

  render() {
    const value = this.props.store.getState().user.wantsConsult;

    return(
      <div className="consult-request">
        <input type="checkbox" name="consult-request" id="consult-request" value={value} onChange={this.onChecked} />
        <label htmlFor="consult-request">Request a consultation with a donation advisor</label>
      </div>
      );
  }
}
module.exports = RequestConsultOption;
