import React            from 'react';
import { ContextMixin } from '../ContextMixins';
import Loading          from '../Loading.jsx';

import { 
  getSelectedOrgs,
  organizeOrgsByState
} from '../../store/utils';

import StateOrgs from './StateOrgs.jsx';

class Plan extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = { loading: true };
  }

  get readonly() {
    return false;
  }
  
  stateFromStore(storeState) {

    storeState.service.orgs.then( orgs => {
      const { 
        groups: {
          selected,
          plan 
        },
        service: {
          groupFilters: filters,
          groupDict: states,
          colorSectionsIDDict: colorDict
        }
      } = storeState;

      this.setState({ 
        states, 
        filters, 
        plan,
        colorDict,
        orgs: organizeOrgsByState(getSelectedOrgs(selected,orgs)),
        loading: false
      });
    });
  }

  render() {

    if( this.state.loading ) {
      return <Loading />;
    }

    const { 
      orgs, 
      filters, 
      states,
      plan,
      colorDict
    } = this.state;

    return(
        <div className="planning-section">
          {Object.keys(orgs).map( state =>  <StateOrgs name={state} 
                                                       key={state} 
                                                       orgs={orgs[state]} 
                                                       plan={plan}
                                                       filters={filters} 
                                                       colors={colorDict}
                                                       readonly={this.readonly}
                                                       state={states[state]}
                                            /> )} 
        </div>
    );
  }
}

module.exports=Plan;

