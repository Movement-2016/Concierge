import service from '../m-service';
import utils   from './utils';

import {
  PlanPage,
  ProfilePage,
  SummaryPage
} from '../../client/main/components/DonationPlan';

import {
  ConsultPage
} from '../../client/main/components';

const colorSectionsIDDict = states =>  utils.statesInColor(0,states)
                                            .reduce( (dict,color) => (dict[color.term_id] = color, dict), {} );

const planDataModel = () => {
  const queries = {
    taxonomies:      '.taxonomies',
    colorOrder:       '.colorOrder',
    groups:           '.posts.group',
    states:           utils.STATES_QUERY, 
    statesAndColors:  utils.STATES_AND_COLORS_QUERY,
  };

  return service.queries( queries ).then( results => {

    const {
      taxonomies: [ taxonomies ],
      states,
      colorOrder,
      groups,
      statesAndColors: [ statesAndColors ]
    } = results;

    return { 
      statesDict:          states.reduce( (accum,s) => (accum[s.slug] = s, accum), {}),
      groupFilters:        utils.groupFilters(taxonomies),
      colorSectionsIDDict: colorSectionsIDDict(statesAndColors),
      orgs:                utils.orgs(statesAndColors,groups,colorOrder),
    };
  });
};

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
