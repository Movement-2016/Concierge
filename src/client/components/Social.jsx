import React from 'react';
import { ShareButtons } from 'react-share';

import { TwitterTimelineEmbed } from 'react-twitter-embed';

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

const TwitterFeed = () => <span />;
	// global.IS_SERVER_REQUEST ? <span /> :
	// 	<TwitterTimelineEmbed
	// 		sourceType="profile"
	// 		screenName="movementvote"
	// 		options={{ dnt: true }}
	// 		autoHeight
	// 	/>
	// ;

module.exports = { SocialButtons, TwitterFeed };
