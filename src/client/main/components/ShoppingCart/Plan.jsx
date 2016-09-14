import React     from 'react';

import { ContextMixin } from '../ContextMixins';

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
        <div className="state-group-plan" id={name}>
          <h3 className={group}>{label}</h3>
          {orgs.map( org => <Org key={org.id} filters={filters} {...org} />)}
        </div>    
      );
  }
}

class Plan extends ContextMixin(React.Component) {

  stateFromStore(storeState) {

    const { 
      groups: {
        selected 
      },
      service: {
        orgs,
        filters,
        groupings: {
          terms:states
        }
      }
    } = storeState;

    this.setState({ states, filters, orgs: organizeOrgs(getSelectedOrgs(selected,orgs)) });
  }

  render() {
    const { orgs, filters, states } = this.state;

    return(
        <div className="plan-display-area">
          <div className="plan-groups-area">
          {Object.keys(orgs).map( state =>  <StateOrgs name={state} 
                                                       key={state} 
                                                       orgs={orgs[state]} 
                                                       filters={filters} 
                                                       state={states[state]}
                                            /> )} 
        </div>
      </div>
    );
  }
}

module.exports=Plan;

