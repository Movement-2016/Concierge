import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const Model = {
  paths: ['/contest'],

  component: ContentPage,

  model: () =>
    service.getPage('contest').then(page => {
      return {
        page,
        pageName: 'contest',
      };
    }),

  title: '#MovementVote Poetry Contest',
};

module.exports = Model;
