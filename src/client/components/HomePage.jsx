import React from 'react';
import { connect } from 'react-redux';

import StateMap from './StateMap.jsx';
import Thermometer from './Thermometer.jsx';
import { FacebookFeed, TwitterFeed } from './Social.jsx';
import BlogPosts from './BlogPosts.jsx';

import { cleanHtml } from '../lib/helperFunctions';
import Link from '../services/LinkToRoute';

const Tile = ({ label, image, description, url }) => (
  <Link className="tile donate-tile" to={url}>
    <div className="tile-image" style={{ backgroundImage: `url("${image}")` }} />
    <div className="tile-body">
      <div className="tile-label">
        {label}
        <i className="material-icons">{'chevron_right'}</i>
      </div>
      <div className="tile-description">{description}</div>
    </div>
  </Link>
);

const Testimonial = ({ author, body, image, title }) => (
  <div className="testimonial flex-item">
    <div className="testimonial-content">{body}</div>
    <div className="author-area">
      <div
        className="author-pic"
        style={image ? { backgroundImage: 'url("' + image + '")' } : {}}
      />
      <div className="author-info">
        <div className="author-name">{author}</div>
        <div className="author-title">{title}</div>
      </div>
    </div>
  </div>
);

const Testimonials = ({ testimonials }) => (
  <div className="testimonials flex-container">
    {testimonials.map((t, i) => <Testimonial key={i} {...t} />)}
  </div>
);

const StateMapBound = ({ states }) =>
  global.IS_SERVER_REQUEST ? (
    <span />
  ) : (
    <div className="container">
      <h2 className="section-title">{'Find a Group'}</h2>
      <div className="map-desc">
        {'Click the map to browse Movement Voter Project groups in each state.'}
      </div>
      <StateMap dataSource={states} />
    </div>
  );

const AuthCode = ({ code }) => (
  <p style={{ margin: 30 }} className="well auth-code">
    <h2>
      {'Auth code: '}
      <b>{code}</b>
    </h2>
  </p>
);

const _HomePage = ({
  authCode,
  tagLine,
  introText,
  introLinkText,
  groupNumber,
  goal,
  current,
  homeTileSectionTitle,
  homeTiles,
  model: { states, testimonials, blogPosts },
}) =>
  authCode ? (
    <AuthCode code={authCode} />
  ) : (
    <main className="home">
      <section className="intro-section">
        <div className="container">
          <div className="intro-tagline" dangerouslySetInnerHTML={{ __html: cleanHtml(tagLine) }} />
          <Thermometer goal={goal} current={current} groupNumber={groupNumber} />
        </div>
      </section>
      <div className="intro-description">
        <div className="container">
          <div
            className="description-body"
            dangerouslySetInnerHTML={{ __html: cleanHtml(introText) }}
          />
          <Link to="/about">
            {introLinkText}
            <i className="material-icons">{'chevron_right'}</i>
          </Link>
        </div>
      </div>
      <section className="padded-section donate-section" id="donate">
        <div className="container">
          <h2 className="section-title">{homeTileSectionTitle}</h2>
          <div className="donate-tiles">{homeTiles.map((d, i) => <Tile key={i} {...d} />)}</div>
        </div>
      </section>
      <section className="padded-section blog-section">
        <div className="container">
          <h2 className="section-title">{'Latest Updates'}</h2>
          <BlogPosts posts={blogPosts} />
        </div>
      </section>
      <section className="testimonial-section">
        <div className="container">
          <Testimonials testimonials={testimonials} />
        </div>
      </section>
      <section className="padded-section map-section">
        <StateMapBound states={states} />
      </section>
      <section className="padded-section social-feed-section">
        {global.IS_SERVER_REQUEST ? (
          <span />
        ) : (
          <div className="container">
            <div className="social-feeds">
              <TwitterFeed className="social-feed" />
              <FacebookFeed classname="social-feed" />
            </div>
          </div>
        )}
      </section>
    </main>
  );

const mapStateToProps = ({
  router: {
    target: {
      model,
      model: {
        page: {
          tagLine,
          introText,
          introLinkText,
          number_groups_donated: groupNumber,
          goal,
          current,
          homeTileSectionTitle,
          homeTiles,
        },
      },
    },
    route: {
      queryParams: { code: authCode = '' },
    },
  },
}) => ({
  tagLine,
  introText,
  introLinkText,
  groupNumber,
  goal,
  current,
  homeTileSectionTitle,
  homeTiles,
  model,
  authCode,
});

const HomePage = connect(mapStateToProps)(_HomePage);

module.exports = HomePage;
