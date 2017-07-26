
import {
  HomePage
} from '../../client/components';

import utils from '../lib/query-utils';

import service from '../services/m-service';

const orderColors = ( colors, order ) => {
  var orderMap = order.reduce( (om,c,i) => (om[c] = i, om), {} );
  return colors.sort( (a,b) => orderMap[a.slug] > orderMap[b.slug] );
};

const HomePageModel = {

  paths: [ '/' ],

  component: HomePage,

  title: 'Home',

  model: () => {

    const queries = {
      donateTiles:   '.posts.donatetile',
      news:          '.posts.news',
      testimonials:  '.posts.testimonial',
      states:        utils.STATES_QUERY,
      colors:        utils.COLORS_QUERY,
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
