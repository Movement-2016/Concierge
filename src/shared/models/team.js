import { TeamPage } from '../../client/components';

import service from '../services/m-service';

const TeamModel = {
  paths: ['/team'],

  component: TeamPage,

  title: 'Meet The Team',

  meta: [
    {
      name: 'description',
      content: 'This is the team that makes MVP possible.',
    },
  ],

  model: () => service.db.then(db => ({ teamMembers: db.teamMembers })),
};

module.exports = TeamModel;
