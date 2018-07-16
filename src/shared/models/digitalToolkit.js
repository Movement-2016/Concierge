import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const DigitalToolkitModel = {
  paths: ['/digitaltoolkit'],

  component: ContentPage,

  model: () =>
    service.getPage('digitaltoolkit').then(page => {
      return {
        page,
        pageName: 'digitaltoolkit',
      };
    }),

  title: 'Digital Toolkit',
};

module.exports = DigitalToolkitModel;
