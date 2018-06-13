import { FundsPage, FundPage } from '../../client/components';

import service from '../services/m-service';

const FundsModel = {
  paths: ['/funds'],
  component: FundsPage,
  title: 'Featured Funds',
  meta: [
    {
      name: 'description',
      content:
        'Movement Voter Project featured funds selected for their strategic importance in 2018.',
    },
  ],

  model: () => {
    let props = {};
    return service.db
      .then(db => {
        props.funds = db.funds;
        return service.getPage('funds');
      })
      .then(fundsPage => {
        props.page = fundsPage;
        return props;
      });
  },
};

const FundModel = {
  paths: ['/funds/:slug'],
  component: FundPage,
  title: 'About this featured fund',
  browserOnly: true,

  model: () => service.db.then(db => ({ funds: db.funds, groups: db.groups, states: db.states })),
};

module.exports = { FundsModel, FundModel };
