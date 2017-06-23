
import {
  ContentPage
} from '../../client/main/components';

import service from '../m-service';


const AboutModel = {
  
  paths: [ '/about'  ],

  component: ContentPage,
  
  model: () => service.getPage('about').then( page => { 
    return {
      page,
      pageName: 'about',      
    };
  })
};

module.exports = AboutModel;
