var service  = require('../services/m-service');

const ApiModel = {
  model: () => service.db.then( db => ({db}) )
};

module.exports = ApiModel;
