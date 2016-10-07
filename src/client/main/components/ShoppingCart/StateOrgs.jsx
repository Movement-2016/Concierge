import React            from 'react';

import { 
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
      state,
      readonly
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
          {orgs.map( org => <Org readonly={readonly} key={org.id} filters={filters} amount={amountFromOrg(org)} {...org} />)}
        </div>    
      );
  }
}

module.exports=StateOrgs;

