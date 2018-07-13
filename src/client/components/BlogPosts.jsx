import React from 'react';
import { cleanHtml } from '../lib/helperFunctions';

const BlogPost = ({ body, slug, title, image }) => (
  <div className="blog-post" id={'post-' + slug}>
    <div className="post-image">
      <img src={image} />
    </div>
    <div className="post-content">
      <div className="post-title">{title}</div>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: cleanHtml(body) }} />
    </div>
  </div>
);

const BlogPosts = ({ posts }) => (
  <div className="blog-posts">{posts.map((p, i) => <BlogPost key={i} {...p} />)}</div>
);

module.exports = BlogPosts;
