import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const Model = {
  paths: ['/contest'],

  component: ContentPage,

  title: '#MovementVote Poetry Contest',

  model: () =>
    service.getPage('contest').then(page => ({
      page,
      pageName: 'contest',
    })),
};

module.exports = Model;
