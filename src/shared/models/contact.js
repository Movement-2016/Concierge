
import {
  ContactPage
} from '../../client/components';

import service from '../services/m-service';


const ContactModel = {

  paths: [ '/contact', '/getintouch' ],

  component: ContactPage,

  title: 'ContactPage',

  model: () => service.getPage('contact').then( page => ({page}) ),

  // browserOnly: true
};

module.exports = ContactModel;
