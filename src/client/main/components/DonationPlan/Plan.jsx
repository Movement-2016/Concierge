import React              from 'react';
import Loading            from '../Loading.jsx';
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
    return ['orgs'];
  }

  render() {

    if ( this.state.loading ) {
      return <Loading />;
    }

    const {
      groupFilters: filters,
      statesDict: states,
      colorSectionsIDDict: colorDict,
      orgs,
    } = this.service;

    const {
      groups: {
        selected,
        plan
      }
    } = this.storeState;

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
