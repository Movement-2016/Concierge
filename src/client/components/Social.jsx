import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import FacebookProvider, { Page } from 'react-facebook';

const TwitterFeed = () => (
  <div className="social-feed twitter-feed">
    <div className="feed-title">{'MVP Twitter'}</div>
    <div className="feed-wrapper">
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: 'movementvote' }}
        options={{ height: '400' }}
      />
    </div>
  </div>
);

// const FacebookFeed = () => null;
const FacebookFeed = () => (
  <div className="social-feed facebook-feed">
    <div className="feed-title">{'MVP Facebook'}</div>
    <div className="feed-wrapper">
      <FacebookProvider appId="301323636873436">
        <Page
          href="https://www.facebook.com/MovementVoterProject/"
          tabs="timeline"
          height="400"
          smallHeader="true"
          adaptContainerWidth="true"
          hideCover="true"
          showFacepile="true"
        />
      </FacebookProvider>
    </div>
  </div>
);

module.exports = { FacebookFeed, TwitterFeed };
