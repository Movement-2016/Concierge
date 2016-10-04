import React     from 'react';
import commaize  from 'commaize';

import { ContextMixin } from '../ContextMixins';

class Totals extends ContextMixin(React.Component) {

  stateFromStore(storeState) {
    const {
      groups: { planTotal }
    } = storeState;

    if( !this.state || !('planTotal' in this.state) || this.state.planTotal !== planTotal  ) {
      this.setState({ planTotal });
    }
  }

  render() {

    const { planTotal } = this.state;

    return(
        <div className="plan-totals">
            Your total contribution amount: ${commaize(planTotal)}
        </div>
      );
  }
}


module.exports = Totals;


