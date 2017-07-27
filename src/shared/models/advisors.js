
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
      content: 'MovementVote consultants, adivsors, sponsors and partners'
    }
  ],

  model: () => service.query('.posts.advisor').then( advisors => { return { advisors }; } )

};

module.exports = TeamModel;
