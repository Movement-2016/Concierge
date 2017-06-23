import React     from 'react';
import commaize  from 'commaize';

import StoreWatcher from '../StoreWatcher';

class Totals extends StoreWatcher(React.Component) {

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
        <div className="plan-total">
          <span className="label">Total</span>
          <span className="total">${commaize(planTotal)}</span>
        </div>
      );
  }
}


module.exports = Totals;
