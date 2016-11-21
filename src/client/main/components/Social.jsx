import React      from 'react';

import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
  
const SocialButtons = () => 
(            
  <div className="social-buttons">
    <FacebookShareButton
      url="https://movement2018.org"
      title="Movement 2017"
      description="Support the best community-based vote groups in the country!"
      className="share-button fb-share-button"
    >
      <FacebookIcon size={40}  />
      <span>Share on Facebook</span>
    </FacebookShareButton>
    <TwitterShareButton
      url="https://movement2018.org"
      title="Support the best community-based vote groups in the country!"
      className="share-button twitter-share-button"
    >
      <TwitterIcon size={40}  />
      <span>Share on Twitter</span>
    </TwitterShareButton>
  </div>
);

module.exports = SocialButtons;

