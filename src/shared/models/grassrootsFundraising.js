import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const GrassrootsFundraisingModel = {
  paths: ['/grassroots-fundraising'],

  component: ContentPage,

  model: () =>
    service.getPage('grassrootsfundraising').then(page => {
      return {
        page,
        pageName: 'grassroots-fundraising',
      };
    }),

  title: 'Grassroots Fundraising Toolkit',
};

module.exports = GrassrootsFundraisingModel;
