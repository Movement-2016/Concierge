import { HouseParty } from '../../client/components';

import service from '../services/m-service';

const HousePartyPageModel = {
	paths: ['/houseparty'],
	component: HouseParty,
	title: 'Host A Party',

	model: () => service.getPage('houseparty').then( page => ({page}) ),
};

module.exports = HousePartyPageModel;
