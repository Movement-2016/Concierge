import React     from 'react';

import { ContextMixin } from '../ContextMixins';
import Loading from '../Loading.jsx';

import { 
  getSelectedOrgs,
  organizeOrgs 
} from '../../store/utils';

import Org from './Org.jsx';

class StateOrgs extends React.Component {
  render() {
    
    const { 
      name, 
      orgs, 
      filters, 
      state 
    } = this.props;
    
    const { 
      label, 
      group 
    } = state;

    return (
        <div className="plan-state" id={name}>
        <h3 className={`${group}-state`}>{label}</h3>
          {orgs.map( org => <Org key={org.id} filters={filters} {...org} />)}
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

    if( !this.state.loading ) {
      return;
    }

    storeState.service.orgs.then( orgs => {
      const { 
        groups: {
          selected 
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
        orgs: organizeOrgs(getSelectedOrgs(selected,orgs)),
        loading: false
      });
    });
  }

  render() {
    const { 
      orgs, 
      filters, 
      states,
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
                                                       filters={filters} 
                                                       state={states[state]}
                                            /> )} 
        </div>
    );
  }
}

module.exports=Plan;

