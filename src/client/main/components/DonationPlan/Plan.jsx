import React              from 'react';
import { ContextFromService } from '../ContextMixins';

import {
  getSelectedOrgs,
  organizeOrgsByState
} from '../../store/utils';

import StateOrgs from './StateOrgs.jsx';

class Plan extends ContextFromService(React.Component) {

  get readonly() {
    return false;
  }

  get servicePropNames() {
    return ['orgs', 'groupFilters', 'statesDict', 'colorSectionsIDDict'];
  }

  stateFromStore(storeState) {
    const {
      groups: {
        selected,
        plan
      }
    } = storeState;
    this.setState( {selected, plan} );
  }

  render() {

    const {
      groupFilters: filters,
      statesDict: states,
      colorSectionsIDDict: colorDict,
      orgs,
      selected,
      plan
    } = this.state;

    const sortedOrgs = orgs && organizeOrgsByState(getSelectedOrgs(selected,orgs));

    return (
      <div className="planning-section">
        {Object.keys(sortedOrgs).map( state => {
          return (
            <StateOrgs
              name={state}
              key={state}
              orgs={sortedOrgs[state]}
              plan={plan}
              filters={filters}
              colors={colorDict}
              readonly={this.readonly}
              state={states[state]}
              mobile={this.props.mobile}
            />
          );
      })}
      </div>
    );
  }
}

module.exports=Plan;
