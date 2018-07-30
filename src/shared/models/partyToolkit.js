import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const PartyToolkitModel = {
  paths: ['/partytoolkit'],

  component: ContentPage,

  model: () =>
    service.getPage('partytoolkit').then(page => {
      return {
        page,
        pageName: 'partytoolkit',
      };
    }),

  title: 'Organizers House Party Toolkit',
};

module.exports = PartyToolkitModel;
