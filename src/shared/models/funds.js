import { FundsPage } from '../../client/components';

import service from '../services/m-service';

const FundsModel = {
	paths: ['/funds'],

	component: FundsPage,

	title: 'Featured Funds',

	meta: [
		{
			name: 'description',
			content: 'Movement Voter Project featured funds, selected for their strategic importance in 2018.',
		},
	],

	model: () => service.db.then(db => ({ funds: db.funds })),
};

module.exports = FundsModel;
