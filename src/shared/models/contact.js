import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const ContactModel = {
  paths: ['/contact'],

  component: ContentPage,

  title: 'Contact',

  model: () =>
    service.getPage('contact').then(page => ({
      page,
      pageName: 'contact',
    })),
};

module.exports = ContactModel;
