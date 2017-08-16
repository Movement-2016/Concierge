import service from '../services/m-service';

import {
  PlanPage,
  ProfilePage,
  SummaryPage
} from '../../client/components/DonationPlan';

import {
  ConsultPage
} from '../../client/components';

const planDataModel = () => service.db.then( db => ({db}) );

const noop = () => Promise.resolve( {} );

const Models = {
  Plan: {
    paths:       [ '/plan' ],
    component:   PlanPage,
    model:       planDataModel,
    browserOnly: true,
    title:       'Your Donation Plan'
  },
  PlanSummary: {
    paths:       [ '/plan/summary' ],
    component:   SummaryPage,
    model:       planDataModel,
    browserOnly: true,
    title:       'Summary'
  },
  Profile: {
    paths:       [ '/plan/profile' ],
    component:   ProfilePage,
    model:       noop,
    browserOnly: true,
    title:       'Profile'
  },
  Consult: {
    paths:       [ '/plan/consult' ],
    component:   ConsultPage,
    model:       noop,
    browserOnly: true,
    title:       'Request a Consult'
  }
};

module.exports = Models;
