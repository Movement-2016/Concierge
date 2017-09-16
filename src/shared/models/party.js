
import {
  HouseParty
} from '../../client/components';

const HousePartyPageModel = {
  
  paths: [ '/houseparty' ],

  component: HouseParty,

  title: 'Host A Party',
  
  model: () => Promise.resolve( { page: { title: 'Host A House Party' } } ),

  browserOnly: true
};

module.exports = HousePartyPageModel;
