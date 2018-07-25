import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const FaqModel = {
  paths: ['/faq'],

  component: ContentPage,

  model: () =>
    service.getPage('faq').then(page => {
      return {
        page,
        pageName: 'faq',
      };
    }),

  title: 'MVP FAQ',
};

module.exports = FaqModel;
