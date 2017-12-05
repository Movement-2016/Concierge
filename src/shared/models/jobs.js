
import {
  ContentPage
} from '../../client/components';

import service from '../services/m-service';


const JobsModel = {

  paths: [ '/jobs'  ],

  component: ContentPage,

  model: () => service.getPage('jobs').then( page => {
    return {
      page,
      pageName: 'jobs',
    };
  }),

  title: 'Jobs',

  meta: [
    {
      name: 'description',
      content: 'Current job listings with Movement Voter Project.'
    }
  ]
};

module.exports = JobsModel;
