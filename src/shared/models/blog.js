import { BlogPage } from '../../client/components';

import service from '../services/m-service';

const BlogModel = {
  paths: ['/blog'],
  component: BlogPage,
  title: 'More updates',

  model: () => service.db.then(db => ({ posts: db.blogPosts })),
};

module.exports = BlogModel;
