
import {
  HomePage
} from '../../client/main/components';

import service from '../m-service';

const orderColors = ( colors, order ) => {
  const reducer = (om,c,i) => {om[c] = i; return om;};
  var orderMap = order.reduce( reducer, {} );
  return colors.sort( (a,b) => orderMap[a.slug] > orderMap[b.slug] );
};

const HomePageModel = {
  
  paths: [ '/' ],

  component: HomePage,
  
  model: () => {
    
    const queries = {
      donateTiles:   '.posts.donatetile',
      news:          '.posts.news',
      testimonials:  '.posts.testimonials',
      states:        '.taxonomies.state.terms.*{.parent!=0}',
      colors:        '.taxonomies.state.terms.*{.parent==0}',
      colorOrder:    '.colorOrder'
    };
    
    let props = {};
    return service.queries(queries).then( _hash => {

      props = { ..._hash };
      
      props.colorSections = orderColors( props.colors, props.colorOrder );
      
      return service.getPage('home');
    
    }).then( homePage => {

      props.page = homePage;
      
      return props;
    });
  }
};

module.exports = HomePageModel;
