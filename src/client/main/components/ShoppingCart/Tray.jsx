import React     from 'react';
import { Link }  from 'react-router';

import { ContextMixin } from '../ContextMixins';

class Tray extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = {
      selected: []
    };
  }

  stateFromStore(storeState) {
    const { groups:{ selected } } = storeState;

    this.setState({ selected });
  }

  render() {
    const { selected:{length} } = this.state;

    const s = length !== 1 ? 's' : '';

    return(
        <div className="shopping-cart-tray  hide-on-small-and-down">
          <div className="info">{`You have selected ${length} organization${s} for your donation plan.`}</div>
          {length ? <Link to="/plan" className="btn">Go to plan</Link> : ''}
        </div>
      );
  }
}

module.exports = Tray;
