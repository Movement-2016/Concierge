
import {
  ContentPage
} from '../../client/main/components';

import service from '../m-service';


const TeamModel = {
  
  paths: [ '/team'  ],

  component: ContentPage,
  
  model: () => service.getPage('team').then( page => { 
    return {
      page,
      pageName: 'team',      
    };
  })
};

module.exports = TeamModel;
