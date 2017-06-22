
import service      from '../m-service';
import utils        from './utils';

const convertMenuToHierarchy = _menu => {

  const menu = [];
  _menu.forEach( item => {
      const parent = parseInt(item.parent);
      var id = item.ID;
      if( parent === 0 ) {
        if( !menu[id] ) {
          menu[id] = item;
          menu[id].children = [];
        }
      } else {
        if( !menu[parent] ) {
          var parentItem = _menu.filter( m => m.ID === parent )[0];
          menu[parent] = parentItem;
          menu[parent].children = [];
        }
        menu[parent].children.push(item);
      }
    });
  return menu; 
};

const AppModel = {

  model: () => {

    const queries = {
      menu:       '.menu',
      taxonomies: '.taxonomies'
    };

    return service.queries( queries ).then( results => {

      return {
        menu: convertMenuToHierarchy(results.menu),
        groupFilters: utils.groupFilters(results.taxonomies[0])
      };
    });
  }
};

module.exports = AppModel;
