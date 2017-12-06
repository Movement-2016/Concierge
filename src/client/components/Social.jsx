import React from 'react';
import {
  ShareButtons,
} from 'react-share';

import { SITE_TITLE } from '../../config';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

function SocialButtons() {
  return (
    <div className="social-buttons">
      <FacebookShareButton
        url="http://movementvote.org"
        quote="Support the best community-based vote groups in the country!"
        className="share-button fb-share-button"
      >
        <img src="/images/facebook-icon.svg" />
      </FacebookShareButton>
      <TwitterShareButton
        url="http://movementvote.org"
        title="Support the best community-based vote groups in the country!"
        className="share-button twitter-share-button"
      >
        <img src="/images/twitter-icon.svg" />
      </TwitterShareButton>
    </div>
  );
}

module.exports = SocialButtons;
