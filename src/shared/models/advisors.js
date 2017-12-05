
import {
  AdvisorPage
} from '../../client/components';

import service from '../services/m-service';


const AdvisorModel = {

  paths: [ '/advisors'  ],

  component: AdvisorPage,

  title: 'Advisors',

  meta: [
    {
      name: 'description',
      content: 'Movement Voter Project consultants, advisors, sponsors and partners'
    }
  ],

  model: () => service.db.then( db => ({ advisors: db.advisors }) )

};

module.exports = AdvisorModel;
