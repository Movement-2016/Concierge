import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const DigitalToolkitModel = {
  paths: ['/digital-toolkit'],

  component: ContentPage,

  model: () =>
    service.getPage('digitaltoolkit').then(page => {
      return {
        page,
        pageName: 'digital-toolkit',
      };
    }),

  title: 'Digital Toolkit',
};

module.exports = DigitalToolkitModel;
