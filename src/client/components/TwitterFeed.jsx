import React from 'react';
import { Timeline } from 'react-twitter-widgets';

const TwitterFeed = () => (
  <Timeline
    dataSource={{ sourceType: 'profile', screenName: 'movementvote' }}
    options={{ height: '400' }}
  />
);

module.exports = TwitterFeed;
