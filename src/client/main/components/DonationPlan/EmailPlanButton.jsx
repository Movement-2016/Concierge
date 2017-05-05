import React     from 'react';

import { emailPlan } from '../../store/utils';

class EmailPlanButton extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor() {
    super(...arguments);
    this.onEmail = this.onEmail.bind(this);
  }

  onEmail(e) {
    e.preventDefault();
    const storeState = this.context.store.getState();
    const { onError, onDone } = this.props;
    emailPlan( { storeState, onError, onDone } );
  }


  render() {
    const { text, children } = this.props;
    return <button onClick={this.onEmail} className="complete-button btn waves-effect waves-light">{text}{children}</button>;
  }
}

module.exports=EmailPlanButton;

