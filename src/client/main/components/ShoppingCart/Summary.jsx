import React     from 'react';
import commaize  from 'commaize';

import { ContextMixin } from '../ContextMixins';

import EmailPlanButton from './EmailPlanButton.jsx';
import Alert           from '../../../ui/Alert.jsx';

// fixed at bottom of screen

class Summary extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);

    this.state = {
      error: null,
      msg: null,
      planTotal: 0
    };

    this.onError = this.onError.bind(this);
    this.onDone  = this.onDone.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  stateFromStore(storeState) {
    const { groups: {planTotal} } = storeState;
    if( planTotal !== this.state.planTotal ) {
      this.setState({ planTotal, msg: '', error: '' });
    }
  }
  
  onError(error) {
    this.setState({ error, msg: '' });
  }

  onDone(msg) {
    this.setState({ error: '', msg });
  }

  onClose() {
    this.setState({ error: '', msg: '' });
  }

  render() {
    const { error, msg, planTotal } = this.state;

    const btnProps = {
      onError: this.onError,
      onDone: this.onDone
    };

    return (
        <div className="plan-summary">
          <div className="container small-container">
            {error || msg 
              ? <Alert msg={error || msg} type={error ? Alert.DANGER : Alert.SUCCESS} onClose={this.onClose} />
              : <div className="summary">
                  Your total contribution amount: ${commaize(planTotal)}
                  <EmailPlanButton {...btnProps} >Email me this plan</EmailPlanButton>
                  {' or '}
                  <EmailPlanButton {...btnProps} advisorMode>Request consultation</EmailPlanButton>
                </div>
            }
          </div>
        </div>
      );
  }
}

module.exports = Summary;

