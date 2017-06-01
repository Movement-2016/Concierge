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
      colors,
      plan,
      state,
      readonly,
      mobile
    } = this.props;

    const {
      name:label,
      parent: colorID
    } = state;

    const amountFromOrg = org => {
      const { amount = 0 } = planFromOrg(plan,org.ID) || {};
      return amount;
    };

    return (
        <div className="plan-state" id={name}>
        <h3 className={colors[colorID].slug}>{label}</h3>
          {orgs.map( org => <Org readonly={readonly} key={org.ID} filters={filters} amount={amountFromOrg(org)} mobile={mobile} {...org} />)}
        </div>
      );
  }
}

module.exports=StateOrgs;
