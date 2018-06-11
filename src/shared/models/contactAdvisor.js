import { ContactPage } from '../../client/components';

import service from '../services/m-service';

const ContactAdvisorModel = {
  paths: ['/contact-advisor'],

  component: ContactPage,

  title: 'Talk To An Advisor',

  model: () => service.getPage('contactadvisor').then(page => ({ page })),
};

module.exports = ContactAdvisorModel;
