import React from 'react';
import path from 'jspath';

import Org from './Org.jsx';


const amountFromOrg = ({id:group},plan) => {
  const { amount = 0 } = path( `..{.group==${group}}`,plan )[0];
  return amount;
};

const StateOrgs = ({

      groups,
      plan,
      state: {
        id,
        slug,
        name,
        parent: {
          slug: colorID
        }
      },
      readonly,
      mobile
    }) => <div className="plan-state" id={slug}>
            <h3 className={colorID}>{name}</h3>
              {groups
                .filter( grp => grp.state.id === id )
                .map( org => <Org readonly={readonly} 
                                   key={org.id} 
                                   amount={amountFromOrg(org,plan)} 
                                   mobile={mobile} 
                                   {...org}
                             />)}
          </div>
;

module.exports=StateOrgs;
