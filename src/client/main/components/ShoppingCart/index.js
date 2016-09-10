import React     from 'react';

import { Link }         from 'react-router';

import { ContextMixin } from '../ContextMixins';

import { getSelectedOrgs } from '../../store/utils';

import CartLine from './CartLine.jsx';

const CartMenu = () => {
  return (
      <div className="shopping-cart-menu">
        <ul>
          <li>
            Visit the <img src="/images/ic_star_border_red_24dp.png" alt="" /> Contribution links to give money now
          </li>
          <li>
            <Link to="/email-plan">Email this plan to yourself</Link>
          </li>
          <li>
            <Link to="/discuss-plan">Discuss this plan with a advisor</Link>
          </li>
        </ul>
      </div>
    );
};

// {this.state.orgs.map( o => <CartLine key={o.id} {...o} />)}

class Cart extends ContextMixin(React.Component) {

  stateFromStore(storeState) {
    const { 
      groups: {
        selected 
      },
      service: {
        orgs
      }
    } = storeState;

    this.setState({ orgs: getSelectedOrgs(selected,orgs) });
  }

  render() {
    return (
      <div className="shopping-cart">
        <CartMenu />
        <h1>Your Donation Plan</h1>
        <div className="shopping-cart-items">
          <h4>coming soon...</h4>
        </div>
      </div>
    );
  }
}

module.exports = Cart;

