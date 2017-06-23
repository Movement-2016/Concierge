import {
  PlanPage,
  ProfilePage,
  SummaryPage
} from '../../client/main/components/DonationPlan';

import {
  ConsultPage
} from '../../client/main/components';

const Plan = {
  
  paths: [ '/plan' ],

  component: PlanPage,
  
  model: () => Promise.resolve( {} ),

  browserOnly: true
};

const PlanSummary = {
  
  paths: [ '/plan/summary' ],

  component: SummaryPage,
  
  model: () => Promise.resolve( {} ),

  browserOnly: true
};

const Profile = {
  
  paths: [ '/plan/profile' ],

  component: ProfilePage,
  
  model: () => Promise.resolve( {} ),

  browserOnly: true
};

const Consult = {
  
  paths: [ '/plan/consult' ],

  component: ConsultPage,
  
  model: () => Promise.resolve( {} ),

  browserOnly: true
};

const Models = {
  Plan,
  PlanSummary,
  Profile,
  Consult
};

module.exports = Models;
