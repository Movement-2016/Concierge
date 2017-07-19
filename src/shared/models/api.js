var service  = require('../m-service');
var utils   = require('./utils');


const ApiModel = {


  model: () => {

    const queries = {
      groups:           '.posts.group',
      colorOrder:       '.colorOrder',
      colors:           utils.COLORS_QUERY,
      states:           utils.STATES_QUERY
    };

    return service.queries(queries).then( results => {

        const {
          colorOrder,
          groups,
          colors,
          states,
        } = results;

        return {
          orgs: utils.orgs(colors, states, groups, colorOrder)
        };
      });
    }
};


module.exports = ApiModel;
