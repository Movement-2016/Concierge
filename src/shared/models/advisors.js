
import {
  AdvisorPage
} from '../../client/main/components';

import service from '../m-service';


const TeamModel = {
  
  paths: [ '/advisors'  ],

  component: AdvisorPage,
  
  model: () => service.query('.posts.advisor').then( advisors => {return { advisors }} )

};

module.exports = TeamModel;
