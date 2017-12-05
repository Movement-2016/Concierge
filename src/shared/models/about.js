
import {
  ContentPage
} from '../../client/components';

import service from '../services/m-service';


const AboutModel = {

  paths: [ '/about'  ],

  component: ContentPage,

  model: () => service.getPage('about').then( page => {
    return {
      page,
      pageName: 'about',
    };
  }),

  title: 'About',

  meta: [
    {
      name: 'description',
      content: 'Movement Voter Project provides tools for activists and donors to connect with hundreds of grassroots vote groups across the United States' 
    },
    {
      name: 'keywords',
      content: 'about, grassroots, movement-2017, movement-voter-project'
    }
  ]
};

module.exports = AboutModel;
