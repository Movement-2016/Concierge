
import { 
  OrgsEntryPage,
  OrgsPageMobile
} from '../../client/components/Orgs';

import service from '../services/m-service';

const model = () => service.db.then( db => ({db}) );

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
  model,
  browserOnly: true
};

module.exports = { GroupsModel, GroupsSlugModel };
