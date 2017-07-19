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
      states:           utils.STATES_QUERY,
      colors:           utils.COLORS_QUERY
    };

    return service.queries(queries).then( hash => {

      const {
        taxonomies: [ taxonomies ],
        colorOrder,
        groups,
        states,
        colors,
      } = hash;

      const colorSections = utils.colorSections(colors, colorOrder);

      return {
        colorOrder,
        groups,
        colorSections,
        statesDict:        states.reduce( (accum,s) => (accum[s.slug] = s, accum), {}),
        groupFilters:      utils.groupFilters(taxonomies),
        orgs:              utils.orgs(colors, states, groups, colorOrder),
        numGroups:         Object.keys(groups).length,
        colorSectionsDict: utils.colorSectionsDict(colorSections, states),
        ezDonateTiles:     hash.donateTiles.splice(0,2)
      };
    });

  }
};

module.exports = GroupsModel;
