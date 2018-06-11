
import service from '../services/m-service';

const AppModel = {

  model: () => {

    return service.db.then( db => {

      return {
        headerMenu: db.buildTree('headerMenu'),
        footerMenu: db.buildTree('footerMenu'),
      };
    });
  }
};

module.exports = AppModel;
