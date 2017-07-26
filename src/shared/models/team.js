
import {
  ContentPage
} from '../../client/components';

import service from '../services/m-service';


const TeamModel = {
  
  paths: [ '/team'  ],

  component: ContentPage,
  
  title: 'Team',

  meta: [
    {
      name: 'description',
      content: 'This is the team that makes Movement 2017/2018 possible.'
    }
  ],

  model: () => service.getPage('team').then( page => { 
    return {
      page,
      pageName: 'team',      
    };
  })
};

module.exports = TeamModel;
