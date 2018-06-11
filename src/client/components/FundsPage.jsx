import React from 'react';
import { connect } from 'react-redux';
import { Shell } from './ContentPage.jsx';

const _FundsPage = ({ funds }) => (
	<Shell title="Advisory Board" name="advisors">
		<div className="content">
			{'Testing content'}
		</div>
	</Shell>
);

const mapStoreToProps = ({
	router: {
		target: {
			model: { funds },
		},
	},
}) => ({ funds });

const FundsPage = connect(mapStoreToProps)(_FundsPage);

module.exports = FundsPage;
