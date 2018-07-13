import { HomePage } from '../../client/components';

import service from '../services/m-service';

const HomePageModel = {
  paths: ['/'],

  component: HomePage,

  title: 'Home',

  model: () => {
    let props = {};
    return service.db
      .then(db => {
        props = {
          testimonials: db.query('testimonials'),
          blogPosts: db.query('blogPosts'),
          states: db.denormalizedStates,
        };

        return service.getPage('home');
      })
      .then(homePage => {
        props.page = homePage;

        return props;
      });
  },
};

module.exports = HomePageModel;
