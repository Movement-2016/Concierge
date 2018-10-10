import React from 'react';
import { connect } from 'react-redux';

import { Shell } from './ContentPage.jsx';
import BlogPosts from './BlogPosts.jsx';

const _BlogPage = ({ posts }) => (
  <Shell title="More Updates" name="blog-page">
    <BlogPosts posts={posts.slice(1)} />
  </Shell>
);

const mapStoreToProps = ({
  router: {
    target: {
      model: { posts },
    },
  },
}) => ({ posts });

const BlogPage = connect(mapStoreToProps)(_BlogPage);

module.exports = BlogPage;
