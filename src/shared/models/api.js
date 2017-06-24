var service  = require('../m-service');
var utils   = require('./utils');


const ApiModel = {


  model: () => {

    const queries = {
      groups:        utils.GROUPS_QUERY,
      allStates:     utils.STATES_QUERY,
      colorOrder:    '.colorOrder',
    };

    return service.queries(queries).then( results => {

        const {
          colorOrder,
          groups,
          allStates: [ allStates ]
        } = results;

        return {
          orgs: utils.orgs(allStates,groups,colorOrder)
        };
      });
    }
};


module.exports = ApiModel;
