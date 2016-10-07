import React            from 'react';
import { ContextMixin } from '../ContextMixins';
import Loading          from '../Loading.jsx';

import { 
  getSelectedOrgs,
  organizeOrgsByState
} from '../../store/utils';

import Org       from './Org.jsx';
import StateOrgs from './StateOrgs.jsx';

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
        <div className="planning-section">
          {Object.keys(orgs).map( state =>  <StateOrgs name={state} 
                                                       key={state} 
                                                       orgs={orgs[state]} 
                                                       plan={plan}
                                                       filters={filters} 
                                                       OrgComponent={Org}
                                                       state={states[state]}
                                            /> )} 
        </div>
    );
  }
}

module.exports=Plan;

