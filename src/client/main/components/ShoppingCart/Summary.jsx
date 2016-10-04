import React     from 'react';
import commaize  from 'commaize';
import { Link }  from 'react-router';

import Loading         from '../Loading.jsx';
import Totals          from './Totals.jsx';
import EmailPlanButton from './EmailPlanButton.jsx';

import { ContextMixin } from '../ContextMixins';

import { 
  getSelectedOrgs,
  organizeByOrgs
} from '../../store/utils';

import RequestConsult from './RequestConsultOption.jsx';

class SummaryOrg extends React.Component {
  render() {
    const { 
      urlGive,
      urlWeb,
      name,
      amount, 
      state:{label}, 
    } = this.props;

    return (
      <li>
        <span className="name" dangerouslySetInnerHTML={{__html:name}} /> <span className="state">({label})</span> <span className="amount">${commaize(amount)}</span>
        {urlGive && <a className="group-link" href={urlGive} target="_blank"><i className="material-icons">star_border</i>Contribute</a>}
        {urlWeb  && <a className="group-link" href={urlWeb}  target="_blank"><i className="material-icons">link</i>Website</a>}
      </li>
      );
  }
}

class SummaryUser extends ContextMixin(React.Component) {
  
  constructor() {
    super(...arguments);
    this.state = { 
      user: null
    };
  }

  stateFromStore(storeState) {
    const { user } = storeState;
    this.setState({ user });
  }

  render() {

    if( !this.state.user ) {
      return <span />;
    }

    const {      
      fname,
      lname,
      phone,
      email
    } = this.state.user;

    return (
        <div className="user">
          <span className="fname">{fname}</span> <span className="lname">{lname}</span>
          <span className="email">{email}</span> <span className="phone">{phone}</span>
          <Link className="btn" to="/plan/profile">Edit Profile</Link>
        </div>
      );
  }
}

class Summary extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = { loading: true };
  }

  stateFromStore(storeState) {

    if( !this.state.loading ) {
      return;
    }

    storeState.service.orgs.then( orgs => {
      const { 
        groups: {
          selected,
          plan 
        },
        service: {
          groupings: {
            terms:states
          }
        },
      } = storeState;

      this.setState({ 
        states, 
        plan,
        orgs: organizeByOrgs(getSelectedOrgs(selected,orgs)),
        loading: false
      });      
    });    
  }

  render() {

    const { 
      orgs, 
      states,
      plan,
      loading
    } = this.state;

    if( loading ) {
      return <Loading />;
    }

    return(
      <div className="plan-summary">
        <Totals />
        <ul className="plan-summary-lines">
          {plan.map( ({id,amount}) => <SummaryOrg key={id}  {...orgs[id]} state={states[orgs[id].state]} amount={amount} /> )}
        </ul>
        <div className="action-area">   
          <Link className="btn" to="/plan">Make Changes</Link>      
          <SummaryUser />
          <RequestConsult />
          <EmailPlanButton>Email me this plan</EmailPlanButton>
        </div>
      </div>
    );
  }
}

module.exports = Summary;


