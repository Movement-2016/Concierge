var service  = require('../m-service');
var utils   = require('./utils');


const ApiModel = {


  model: () => {

    const queries = {
      groups:           '.posts.group',
      colorOrder:       '.colorOrder',
      statesAndColors:  utils.STATES_AND_COLORS_QUERY,
    };

    return service.queries(queries).then( results => {

        const {
          colorOrder,
          groups,
          statesAndColors: [ statesAndColors ]
        } = results;

        return {
          orgs: utils.orgs(statesAndColors,groups,colorOrder)
        };
      });
    }
};


module.exports = ApiModel;
