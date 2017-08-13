import utils from '../lib/query-utils';

import { 
  OrgsEntryPage,
  OrgsPageMobile
} from '../../client/components/Orgs';

import service from '../services/m-service';

const model = () => {

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
};

const meta = [
  {
    name: 'description',
    content: 'A directory of grassroots orgs as culled and curated by Gamechangers Lab. Use this page to create a donation plan'
  }
];

const title = 'Groups';

const GroupsModel = {

  paths: [ '/groups' ],
  component: OrgsEntryPage,
  title,
  meta,
  model

};

const GroupsSlugModel = {

  paths: [ '/groups/:slug' ],
  component: OrgsPageMobile,
  title,
  meta,
  model
};

module.exports = { GroupsModel, GroupsSlugModel };
