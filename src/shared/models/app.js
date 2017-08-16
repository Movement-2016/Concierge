
import service from '../services/m-service';

const AppModel = {

  model: () => {

    return service.db.then( db => {

      return {
        menu: db.buildTree('menu')
      };
    });
  }
};

module.exports = AppModel;
