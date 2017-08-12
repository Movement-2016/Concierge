import React from 'react';

import {
  planFromOrg
} from '../../../shared/lib/group-utils';

import Org from './Org.jsx';


const amountFromOrg = (org,plan) => {
  const { amount = 0 } = planFromOrg(plan,org.ID) || {};
  return amount;
};

const StateOrgs = ({
      addPlanItem,
      toggleItem,
      name,
      orgs,
      filters,
      colors,
      plan,
      state: {
        name:label,
        parent: colorID
      },
      readonly,
      mobile
    }) => <div className="plan-state" id={name}>
            <h3 className={colors[colorID].slug}>{label}</h3>
              {orgs.map( org => <Org readonly={readonly} 
                                   key={org.ID} 
                                   filters={filters} 
                                   amount={amountFromOrg(org,plan)} 
                                   mobile={mobile} 
                                   {...org}
                                   addPlanItem={addPlanItem}
                                   toggleItem={toggleItem} 
                                />)}
          </div>
;

module.exports=StateOrgs;
