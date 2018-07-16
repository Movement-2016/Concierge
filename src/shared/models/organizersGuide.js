import { ContentPage } from '../../client/components';

import service from '../services/m-service';

const OrganizersGuideModel = {
  paths: ['/organizersguide'],

  component: ContentPage,

  model: () =>
    service.getPage('organizersguide').then(page => {
      return {
        page,
        pageName: 'organizersguide',
      };
    }),

  title: 'MVP Organizers Guide',
};

module.exports = OrganizersGuideModel;
