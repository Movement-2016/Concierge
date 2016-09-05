import 'whatwg-fetch';

const WP_API_HOST = 'movement2016.org'; // 'm2016dev.wpengine.com';

const WP_API_BASE = 'http://' + WP_API_HOST + '/wp-json/movement-2.1/';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
 
function parseJSON(response) {
  return response.json();
}

class M2016Service {
  constructor() {
    this._base = WP_API_BASE;
    this._groups = null;
    this._taxonomy = null;
  }

  _fetch(part) {
    return fetch( this._base + part )
            .then( checkStatus )
            .then( parseJSON );
  }

  init() {
    if( this._groups ) {
      return Promise.resolve(this);
    }
    return Promise.all( [ this._fetch( 'orgs' ), this._fetch('tags') ] )
        .then ( ([ orgs, tags ])  => {
          this._groups = orgs;
          this._taxonomy = tags;
          return this;
        });    
  }

  get groups() {
    return this._groups;
  }

  get groupsByStateColor() {
    if( !this._groupsByStateColor ) {
      const gbsc = {};
      const schemes = this.stateColorSchemes;
      for( let color in Object.keys(schemes) ) {
        gbsc[color] = {
          color: schemes[color],
          states: {}
        };
      }
      const states = this.states;
      for( let group in this._groups ) {
        const { stateId:state } = group;
        const color = states[state].color;
        !gbsc[color].states[state] && (gbsc[color].states[state] = []);
        gbsc[color].states[state].push(group);
      }
      this._groupsByStateColor = gbsc;
    }
    return this._groupsByStateColor;
  }

  get states() {
    return this._taxonomy.groupings.states;
  }

  get statesByColor() {
    if( !this._statesByColor ) {
      this._statesByColor = {};
      for( let state of this.states ) {
        const { color } = state;
        let states = this._statesByColor[color];
        !states && (this._statesByColor[color] = states = []);
        states.push(state);
      }
    }
    return this._statesByColor;
  }

  get filters() {
    return this._taxonomy.filters;
  }

  get stateColorSchemes() {
    return stateColorSchemes;
  }

  get pages() {
    return {
        home,
        donate
      };
  }
}

// TODO: This data should be at the WP Engine site as custom exportable fields

const stateColorSchemes = {
  purple: {
    name: 'purple',
    label: 'Purple States'
  },
  'light-blue': {
    name: 'light-blue',
    label: 'Light Blue States'
  },
  'light-red': {
    name: 'light-red',
    label: 'Light Red States'
  },
  'dark-blue': {
    name: 'dark-blue',
    label: 'Dark Blue States'
  },
  'dark-red': {
    name: 'dark-red',
    label: 'Dark Red States'
  }
};



const homePageTiles = [
  {
    linkto: '/donate',
    glyph: 'ok',
    text: 'Donate Easy',
    body: 'Split your contribution evenly between Movement 2016 groups'
  },
  {
    linkto: '/custom',
    img: '/images/photos/murika.png',
    text: 'Donate Customized',
    body: 'Create your own giving plan'
  },
  {
    linkto: 'getintouch',
    glyph: 'phone',
    text: 'Talk to a Human',
    body: 'Get research on states and organizations'
  },
  {
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfH_n5RoI7DZbQpZ739Fm5-8_hjUHt4YIGSlrg6_wWRnNvrkw/viewform',
    glyph: 'plane',
    text: 'Travel',
    body: 'Volunteer to travel and work in a purple state',
    compact: true
  },
  {
    linkto: '/plan',
    glyph: 'glass',
    text: 'Host a Party',
    body: 'Create your own donor house party',
    compact: true
  },
  {
    linkto: '/aboutus',
    glyph: 'info-sign',
    text: 'About Us',
    body: 'Learn more about the hows and whys of Movement 2016',
    compact: true
  }
];

const home = {
  title: 'Support the Best Community-Based<br />Vote Groups in the Country',
  tiles: homePageTiles
};

const donatePageTiles = [
  {
    title:    'Purple States',
    body:     'Spread out donations to all purple states',
  },
  {
  },
  {
  },
  {
  },
  {
  },
  {
  },
  {
  },
  {
  },
  {
  },
];

const donate = {
  title: 'Easy Donation',
  tiles: donatePageTiles,
  defaultTile: {
    compact: true,
    text:    'Donate Now',
    title:   'Lorem ipsum dolor.',
    body:    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dolor augue, varius accumsan eleifend quis.',
    href:    'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  }
};

module.exports = new M2016Service();