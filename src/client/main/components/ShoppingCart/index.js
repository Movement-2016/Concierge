import React     from 'react';

import { Link }         from 'react-router';

import { ContextMixin } from '../ContextMixins';

import { getSelectedOrgs } from '../../store/utils';

import CartLine from './CartLine.jsx';

const CartMenu=() => {
  return (
      <div className="shopping-cart-menu">
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
    }=storeState;

    this.setState({ orgs: getSelectedOrgs(selected,orgs) });
  }

  render() {
    return (
      <div className="shopping-cart">
          <div className="donor-area"> 
            <h2> Plan Your Contributions </h2>
            <p>Use this worksheet to help plan how to most effectively make your donations to grassroots movement groups.</p> 
            <p>Put in a planned donation for each group you are considering, and a report page will show how to give to those groups once you’ re finished. </p>
            <div className="info-area">
              <h3>Your Information</h3> 
              <input type="text" placeholder="First Name" value="" /> 
              <input type="text" placeholder="Last Name" value="" /> 
              <input type="text" placeholder="Email" value="" /> 
              <input type="text" placeholder="Phone" value="" />
            </div>

            <div className="plan-display-area">
              <div className="plan-groups-area">
              <div className="state-group-plan" id="Colorado">
                <h3 className="purple">Colorado</h3>
                <div className="group-plan">
                  <div className="name-plan">
                    Colorado People’s Alliance / Action (COPA) <span className="tags-plan">(501c3 501c4)</span>
                  </div>
                  <div className="giving-area">
                    <label htmlFor="amount646">$</label><input type="text" id="amount646" value="0" />
                  </div>
                </div>

                <div className="group-plan">
                  <div className="name-plan">
                    New Era Colorado &amp; Action Fund<span className="tags-plan">(501c3 501c4)</span>
                  </div>
                  <div className="giving-area">
                    <label htmlFor="amount252">$</label><input type="text" id="amount252" value="0" />
                  </div>
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports=Cart;

