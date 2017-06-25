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
      states:        '.taxonomies.state.terms.*{.parent!=0}',
      taxonomies:    '.taxonomies',
      colorOrder:    '.colorOrder',
      groups:        utils.GROUPS_QUERY,
      allStates:     utils.STATES_QUERY,
      donateTiles:   '.posts.donatetile',
    };

    return service.queries(queries).then( hash => {

      const {
        taxonomies: [ taxonomies ],
        colorOrder,
        groups,
        states,
        allStates: [ allStates ]
      } = hash;

      return { 
        colorOrder,
        groups,
        statesDict:        states.reduce( (accum,s) => (accum[s.slug] = s, accum), {}),
        groupFilters:      utils.groupFilters(taxonomies),
        colorSections:     utils.colorSections(allStates,colorOrder),
        orgs:              utils.orgs(allStates,groups,colorOrder),
        numGroups:         Object.keys(groups).length,
        colorSectionsDict: utils.colorSectionsDict(allStates,colorOrder),
        ezDonateTiles:     hash.donateTiles.splice(0,2)
      };
    });

  }
};

module.exports = GroupsModel;
