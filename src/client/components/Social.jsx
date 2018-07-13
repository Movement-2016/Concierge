import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import FacebookProvider, { Page } from 'react-facebook';

const TwitterFeed = () => (
  <div className="social-feed twitter-feed">
    <div className="feed-title">{'MVP Twitter'}</div>
    <Timeline
      dataSource={{ sourceType: 'profile', screenName: 'movementvote' }}
      options={{ height: '400' }}
    />
  </div>
);

// const FacebookFeed = () => null;
const FacebookFeed = () => (
  <div className="social-feed facebook-feed">
    <div className="feed-title">{'MVP Facebook'}</div>
    <FacebookProvider appId="301323636873436">
      <Page
        href="https://www.facebook.com/MovementVoterProject/"
        tabs="timeline"
        height="400"
        width="400"
        smallHeader="true"
        adaptContainerWidth="true"
        hideCover="true"
        showFacepile="true"
      />
    </FacebookProvider>
  </div>
);

module.exports = { FacebookFeed, TwitterFeed };
