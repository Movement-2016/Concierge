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

  get tandemForms() {
    return tandemForms;
  }

  get stateColorSchemes() {
    return stateColorSchemes;
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

const tandemForms = [
  {
    title: 'Purple States',
    desc:  'Spread out donations to all purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Purple States (501c3)',
    desc:  'Spread out tax deductable donations to all purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Florida',
    desc:  'Spread out donations to organizations in Florida',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Ohio',
    desc:  'Spread out donations to organizations in Ohio',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Focus Voter ID Laws (501c3)',
    desc:  'Spread out tax deductable donations organizations dealing with new voter ID laws',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Get Out the Purple Vote',
    desc:  'Give to organizations focused on voter turnout in purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Immigration',
    desc:  'Give to organizations focused on issues related to immigration',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Environment',
    desc:  'Spread out tax deductable donations to all purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
  {
    title: 'Environment',
    desc:  'Spread out tax deductable donations to all purple states',
    url:   'https://secure.actblue.com/contribute/page/mvmt-us-movement2016-c4?refcode=homepage'
  },
];


module.exports = new M2016Service();