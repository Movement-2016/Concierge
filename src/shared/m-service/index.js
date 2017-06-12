/* global $ */

var actions = require('./actions');
var path    = require('jspath');

let _fetch = null;

if( typeof window !== 'undefined') {
  _fetch = (url) => {
    return new Promise( (success,error) => $.ajax({url,success,error}) ); //  ,xhrFields: {withCredentials:false}} ) );
  };
} else {
  _fetch = require('node-fetch'.trim()); // prevent browserify bundling
}

const WP_DEV      = false;
const WP_API_HOST = WP_DEV ? 'http://localhost:8081/wordpress' : 'https://wp.movementvote.org';
const WP_API_BASE = WP_API_HOST + '/wp-json/movement-2018/';

function checkStatus(response) {
  if (!response.status || (response.status >= 200 && response.status < 300)) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json ? response.json() : response;
}

class MovementVoteService {
  constructor() {
    this._base = WP_API_BASE;
    this._pages = {};
    this._promises = {};
  }

  _fetch(part) {
    return _fetch( this._base + part, { mode: 'no-cors' } )
            .then( checkStatus )
            .then( parseJSON );
  }

  init( ) {
    console.log('service-init');
    return this;
  }

  get content() {
    if( this._promises['content'] ) {
      return this._promises['content'];
    }
    return this._content
      ? Promise.resolve(this._content)
      : (this._promises['content'] = this._fetch( 'content' )).then( p => {this._promises['content'] = null; return this._content = p;} );
  }

/* Non-promise */

  getPage(slug) {
    return this._content.pages[slug];
  }

  get news() {
    return this._content.posts.news;
  }

  get donateTiles() {
    return this._content.posts.donatetile;
  }

  get testimonials() {
    return this._content.posts.testimonial;
  }

  get advisors() {
    return this._content.posts.advisor;
  }

  get groups() {
    return this._content.posts.group;
  }

  get colorOrder() {
    return this._content.colorOrder;
  }

  /* Returns a structured array of groups with structure orgs[color][state][org] */
  get orgs() {
    if( !this._orgs ) {
      const orgs = {};
      const colors = this.colorSections;
      colors.forEach( color => {
        orgs[color.slug] = {};
        const states = this.statesInColor(color);
        states.forEach( state => {
          const foundOrgs =  path('.posts.group{.fields.state=="'+state.slug+'"}', this._content);
          foundOrgs.length && (orgs[color.slug][state.slug] = foundOrgs);
        });
      });
      this._orgs = orgs;
    }
    return this._orgs;
  }

  /* Returns a structured object of menu items with structure menu.parentItem.childItem */
  get menu() {
    if ( !this._menu ) {
      var menu = {};
      this._content.menu.forEach( item => {
        const parent = parseInt(item.parent);
        var id = item.ID;
        if( parent === 0 ) {
          if( !menu[id] ) {
            menu[id] = item;
            menu[id].children = [];
          }
        } else {
          if( !menu[parent] ) {
            var parentItem = path('.menu{.ID=='+parent+'}',this._content)[0];
            menu[parent] = parentItem;
            menu[parent].children = [];
          }
          menu[parent].children.push(item);
        }
      });
      this._menu = Object.keys(menu).map( k => menu[k]);
    }
    return this._menu;
  }

  /* Returns an unsorted list of states */
  get states() {
    if ( !this._states ) {
      this._states = path('.taxonomies.state.terms.*{.parent!=0}', this._content);
    }
    return this._states;
  }

  /* Returns a list of state color categories sorted in correct display order */
  get colorSections() {
    if ( !this._colorSections ) {
      var colors = path('.taxonomies.state.terms.*{.parent==0}', this._content);
      var orderMap = {};
      this.colorOrder.forEach( (c,i) => orderMap[c] = i );
      this._colorSections = colors.sort( (a,b) => orderMap[a.slug] > orderMap[b.slug] );
    }
    return this._colorSections;
  }

  /* Returns total group number */
  get numGroups() {
    if ( !this._numGroups ) {
      this._numGroups = Object.keys(this.groups).length;
    }
    return this._numGroups;
  }

  /* Returns a dictionary of states */
  get statesDict() {
    if ( !this._statesDict ) {
      const statesList = {};
      this.states.forEach( g => statesList[g.slug] = g );
      this._statesDict = statesList;
    }
    return this._statesDict;
  }

  /* Returns a dictionary of color sections */
  get colorSectionsDict() {
    if ( !this._colorSectionsDict ) {
      const dict = {};
      this.colorSections.forEach( c => {
        dict[c.slug] = c;
        dict[c.slug].count = this.numGroupsInColor(c);
      });
      this._colorSectionsDict = dict;
    }
    return this._colorSectionsDict;
  }

  get colorSectionsIDDict() {
    if ( !this._colorSectionsIDDict ) {
      this._colorSectionsIDDict = this.colorSections.reduce(
        (dict,color) => (dict[color.term_id] = color, dict), {}
      );
    }
    return this._colorSectionsIDDict;
  }

  get groupFilters() {
    if( !this._groupFilters ) {
      const filters = {};
      // remove 'state' from taxonomies
      const taxonomies = this._content.taxonomies;

      for (var t in taxonomies) {
        if ( !( t === 'state' /* || t === 'nonprofit-type' */ ) ) {
          filters[t] = taxonomies[t];
          filters[t].tags = Object.keys(filters[t].terms);
        }
      }
      this._groupFilters = filters;
    }
    return this._groupFilters;
  }

  get filterDict() {
    if( !this._filterDict ) {
      this._filterDict = {};
      path('...terms.*', this.groupFilters ).map( f => this._filterDict[f.name] = f.label );
    }
    return this._filterDict;
  }

  /* Returns a list of states when passed a color category object. */
  statesInColor(color) {
    var id = color['term_id'];
    return path('.taxonomies.state.terms.*{.parent=='+id+'}', this._content);
  }

  /* Returns number of groups in the passed color category */
  numGroupsInColor(color) {
    var total = 0;
    const states = this.statesInColor(color);
    states.forEach( s => total += s.count );
    return total;
  }

}

var service = new MovementVoteService();

service.actions = actions;

module.exports = service;
