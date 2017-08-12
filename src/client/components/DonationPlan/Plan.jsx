import React from 'react';
import { connect } from 'react-redux';

import StateOrgs from './StateOrgs.jsx';

import {
  addPlanItem,
  toggleItem
} from '../../../shared/store/actions/plan';

import {
  getSelectedOrgs,
  organizeOrgsByState
} from '../../../shared/lib/group-utils';

const _Plan = ({
      // store state
      filters,
      states,
      colorDict,
      sortedOrgs,
      donations,

      // dispatch
      addPlanItem,
      toggleItem,

      // native
      mobile,
      readonly,

    }) => <div className="planning-section">
            {Object.keys(sortedOrgs).map( state => {
              return (
                <StateOrgs
                  plan={donations}
                  filters={filters}
                  mobile={mobile}
                  readonly={readonly}
                  colors={colorDict}
                  addPlanItem={addPlanItem}
                  toggleItem={toggleItem}

                  name={state}
                  key={state}
                  orgs={sortedOrgs[state]}
                  state={states[state]}
                />
              );
            })}
          </div>
;

_Plan.defaultProps = {
  readonly: false
};

const mapStateToProps = ({
  router: {
    target: {
      model: {
        groupFilters: filters,
        statesDict: states,
        colorSectionsIDDict: colorDict,
        orgs
      },      
    }
  },
  groups: {
    selected
  },
  plan: {
    donations
  }
}) => ({
  filters,
  states,
  colorDict,
  sortedOrgs: orgs && organizeOrgsByState( getSelectedOrgs(selected,orgs) ),
  orgs,
  selected,
  donations
});

const mapDispatchToProps = { addPlanItem, toggleItem };

const Plan = connect(mapStateToProps,mapDispatchToProps)(_Plan);

module.exports = Plan;
