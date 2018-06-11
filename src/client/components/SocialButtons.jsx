import React from 'react';
import { ShareButtons } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;

function SocialButtons() {
	return (
		<div className="social-buttons">
			<FacebookShareButton
				url="https://movement.vote"
				quote="Support the best community-based vote groups in the country!"
				className="share-button fb-share-button"
			>
				<img src="/images/facebook-icon.svg" />
			</FacebookShareButton>
			<TwitterShareButton
				url="https://movement.vote"
				title="Support the best community-based vote groups in the country!"
				className="share-button twitter-share-button"
			>
				<img src="/images/twitter-icon.svg" />
			</TwitterShareButton>
		</div>
	);
}

module.exports = SocialButtons;
