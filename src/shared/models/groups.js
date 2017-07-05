import utils from './utils';

import { OrgsEntryPage } from '../../client/main/components/Orgs';

import service from '../m-service';

const GroupsModel = {
  
  paths: [ '/groups', '/groups/:slug' ],

  component: OrgsEntryPage,
  
  title: 'Groups',

  meta: [
    {
      name: 'description',
      content: 'A directory of grassroots orgs as culled and curated by Gamechangers Lab. Use this page to create a donation plan'
    }
  ],

  model: () => {
    
    const queries = {
      taxonomies:       '.taxonomies',
      colorOrder:       '.colorOrder',
      groups:           '.posts.group',
      donateTiles:      '.posts.donatetile',
      statesAndColors:  utils.STATES_AND_COLORS_QUERY,
      states:           utils.STATES_QUERY, 
    };

    return service.queries(queries).then( hash => {

      const {
        taxonomies: [ taxonomies ],
        colorOrder,
        groups,
        states,
        statesAndColors: [ statesAndColors ]
      } = hash;

      return { 
        colorOrder,
        groups,
        statesDict:        states.reduce( (accum,s) => (accum[s.slug] = s, accum), {}),
        groupFilters:      utils.groupFilters(taxonomies),
        colorSections:     utils.colorSections(statesAndColors,colorOrder),
        orgs:              utils.orgs(statesAndColors,groups,colorOrder),
        numGroups:         Object.keys(groups).length,
        colorSectionsDict: utils.colorSectionsDict(statesAndColors,colorOrder),
        ezDonateTiles:     hash.donateTiles.splice(0,2)
      };
    });

  }
};

module.exports = GroupsModel;
