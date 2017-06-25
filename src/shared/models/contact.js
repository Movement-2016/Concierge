
import {
  ContactPage
} from '../../client/main/components';

import service from '../m-service';


const HomePageModel = {
  
  paths: [ '/contact', '/getintouch' ],

  component: ContactPage,

  title: 'ContactPage',
  
  model: () => service.getPage('contact').then( page => { return { page }; } ),

  browserOnly: true
};

module.exports = HomePageModel;
