import React            from 'react';
import { ContextMixin } from '../ContextMixins';
import Loading          from '../Loading.jsx';

import { 
  getSelectedOrgs,
  organizeOrgsByState,
  planFromOrg 
} from '../../store/utils';

import Org from './Org.jsx';

class StateOrgs extends React.Component {
  render() {
    
    const { 
      name, 
      orgs, 
      filters, 
      plan,
      state 
    } = this.props;
    
    const { 
      label, 
      group 
    } = state;

    const amountFromOrg = org => {
      const { amount = 0 } = planFromOrg(plan,org.id) || {};
      return amount;
    };

    return (
        <div className="plan-state" id={name}>
        <h3 className={`${group}-state`}>{label}</h3>
          {orgs.map( org => <Org key={org.id} filters={filters} amount={amountFromOrg(org)} {...org} />)}
        </div>    
      );
  }
}

class Plan extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = { loading: true };
  }

  stateFromStore(storeState) {

    storeState.service.orgs.then( orgs => {
      const { 
        groups: {
          selected,
          plan 
        },
        service: {
          filters,
          groupings: {
            terms:states
          }
        }
      } = storeState;

      this.setState({ 
        states, 
        filters, 
        plan,
        orgs: organizeOrgsByState(getSelectedOrgs(selected,orgs)),
        loading: false
      });
    });
  }

  render() {
    const { 
      orgs, 
      filters, 
      states,
      plan,
      loading 
    } = this.state;

    if( loading ) {
      return <Loading />;
    }

    return(
        <div className="donation-plan">
          {Object.keys(orgs).map( state =>  <StateOrgs name={state} 
                                                       key={state} 
                                                       orgs={orgs[state]} 
                                                       plan={plan}
                                                       filters={filters} 
                                                       state={states[state]}
                                            /> )} 
        </div>
    );
  }
}

module.exports=Plan;

