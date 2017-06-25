
import {
  HouseParty
} from '../../client/main/components';

const HousePartyPageModel = {
  
  paths: [ '/houseparty' ],

  component: HouseParty,

  title: 'Host A Party',
  
  model: () => Promise.resolve( { page: { post_title: 'Host A House Party' } } ),

  browserOnly: true
};

module.exports = HousePartyPageModel;
