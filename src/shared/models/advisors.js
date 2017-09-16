
import {
  AdvisorPage
} from '../../client/components';

import service from '../services/m-service';


const TeamModel = {
  
  paths: [ '/advisors'  ],

  component: AdvisorPage,

  title: 'Advisors',

  meta: [
    {
      name: 'description',
      content: 'MovementVote consultants, advisors, sponsors and partners'
    }
  ],

  model: () => service.db.then( db => ({ advisors: db.advisors }) )

};

module.exports = TeamModel;
