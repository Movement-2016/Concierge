import React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import StateMap from './StateMap.jsx';
import Thermometer from './Thermometer.jsx';
import { FacebookFeed, TwitterFeed } from './Social.jsx';
import BlogPosts from './BlogPosts.jsx';
import Testimonials from './Testimonials.jsx';
import DonateLink from './DonateLink.jsx';

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

const StateMapBound = ({ states }) => (
  <div className="container">
    <h2 className="section-title">{'Find a Group'}</h2>
    <div className="map-desc">
      {'Click the map to browse Movement Voter Project groups in each state.'}
    </div>
    {!global.IS_SERVER_REQUEST && <StateMap dataSource={states} />}
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
  mobile,
  tagLine,
  introText,
  introDonateLabel,
  introDonateUrl,
  groupNumber,
  goal,
  current,
  homeTiles,
  homeTileSectionTitle,
  homeTileSectionSubtitle,
  homeTestimonialSectionTitle,
  homeTestimonialSectionSubtitle,
  homeMapSectionTitle,
  homeMapSectionSubtitle,
  authCode,
  model: { states, testimonials, blogPosts },
}) =>
  authCode ? (
    <AuthCode code={authCode} />
  ) : (
    <main className="home">
      <section className="intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text">
              <h2
                className="intro-header"
                dangerouslySetInnerHTML={{ __html: cleanHtml(tagLine) }}
              />
              <div
                className="intro-description"
                dangerouslySetInnerHTML={{ __html: cleanHtml(introText) }}
              />
            </div>
            <div className="intro-widgets">
              <DonateLink url={introDonateUrl}>{introDonateLabel}</DonateLink>
              <Thermometer goal={goal} current={current} groupNumber={groupNumber} />
            </div>
          </div>
        </div>
      </section>
      <section className="padded-section donate-section">
        <div className="container">
          <h3 className="section-title">{homeTileSectionTitle}</h3>
          <div className="section-subtitle">{homeTileSectionSubtitle}</div>
          <div className="donate-tiles">{homeTiles.map((d, i) => <Tile key={i} {...d} />)}</div>
        </div>
      </section>
      {!mobile && (
        <section id="map" className="padded-section map-section">
          <div className="container">
            <h2 className="section-title">{homeMapSectionTitle}</h2>
            <div className="section-subtitle">{homeMapSectionSubtitle}</div>
            {!global.IS_SERVER_REQUEST && <StateMap dataSource={states} />}
          </div>
        </section>
      )}
      <section className="padded-section testimonial-section">
        <div className="container">
          <h3 className="section-title">{homeTestimonialSectionTitle}</h3>
          <div className="section-subtitle">{homeTestimonialSectionSubtitle}</div>
        </div>
        <Testimonials testimonials={testimonials} timeInterval={6000} />
      </section>
      <section className="padded-section blog-section">
        <div className="container">
          <h2 className="section-title">{'Latest Updates'}</h2>
          <BlogPosts posts={blogPosts} />
        </div>
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
          introDonateLabel,
          introDonateUrl,
          number_groups_donated: groupNumber,
          goal,
          current,
          homeTiles,
          homeTileSectionTitle,
          homeTileSectionSubtitle,
          homeTestimonialSectionTitle,
          homeTestimonialSectionSubtitle,
          homeMapSectionTitle,
          homeMapSectionSubtitle,
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
  introDonateLabel,
  introDonateUrl,
  groupNumber,
  goal,
  current,
  homeTiles,
  homeTileSectionTitle,
  homeTileSectionSubtitle,
  homeTestimonialSectionTitle,
  homeTestimonialSectionSubtitle,
  homeMapSectionTitle,
  homeMapSectionSubtitle,
  model,
  authCode,
});

const HomePage = connect(mapStateToProps)(_HomePage);

module.exports = HomePage;
