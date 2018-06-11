import {
  ContactPage
} from '../../client/components';

import service from '../services/m-service';


const ContactModel = {

  paths: [ '/contact' ],

  component: ContactPage,

  title: 'Contact Us',

  model: () => service.getPage('contact').then( page => ({page}) ),

};

module.exports = ContactModel;
