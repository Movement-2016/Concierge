import React     from 'react';
import 'whatwg-fetch';

import { ContextMixin } from '../ContextMixins';

import { getSelectedOrgs } from '../../store/utils';

/*
import { Link }         from 'react-router';

import CartLine from './CartLine.jsx';

const CartMenu=() => {
  return (
      <div className="shopping-cart-menu">
      </div>
    );
};
*/
// {this.state.orgs.map( o => <CartLine key={o.id} {...o} />)}

const ADVISOR_EMAIL = 'victor.stone@gmail.com';

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

  onEmailMe() {
    this._emailPlan(this.refs['email']);
  }

  onRequestAdvisor() {
    this._emailPlan(ADVISOR_EMAIL);
  }

  _emailPlan(addr) {
    const { fname, lname, email, phone } = this.refs;
    const fakeData = [
      { id: 245, amount: 100 },
      { id: 247, amount: 200 }
    ];
    const payload = {
      fname,
      lname,
      email,
      phone,
      addr,
      items: fakeData
    };
    fetch (`${location.origin}/api/plan/send`, {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (payload),
    }).then ( () => window.alert('Your plan has been sent') )
    .catch( err => window.alert('there was a problem! ' + err) );
  }

  render() {
    return (
      <div className="shopping-cart">
          <div className="donor-area"> 
            <h2> Plan Your Contributions </h2>
            <p>Use this worksheet to help plan how to most effectively make your donations to grassroots movement groups.</p> 
            <div className="info-area">
              <h3>Your Information</h3> 
              <input ref="fname" type="text" placeholder="First Name" value="" /> 
              <input ref="lname" type="text" placeholder="Last Name" value="" /> 
              <input ref="email" type="text" placeholder="Email" value="" /> 
              <input ref="phone" type="text" placeholder="Phone" value="" />
              <div className="action-area">
                You can email this plan to yoursefl <button className="btn btn-success">Email me</button>{' or '}
                you can request a consultation with a donation advisor<button className="btn btn-success">Request consultation</button>
              </div>
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

