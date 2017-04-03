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
const WP_API_HOST = WP_DEV ? 'http://localhost:8080/wordpress' : 'https://wp.movementvote.org';
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

  get news() {
    return this._news
      ? Promise.resolve(this._news)
      : this.content.then( () => this._news = this._content.posts.news );
  }

  get donateTiles() {
    return this._donateTiles
      ? Promise.resolve(this._donateTiles)
      : this.content.then( () => this._donateTiles = this._content.posts.donatetile );
  }

  get testimonials() {
    return this._testimonials
      ? Promise.resolve(this._testimonials)
      : this.content.then( () => this._testimonials = this._content.posts.testimonial );
  }

  get advisors() {
    return this._advisors
      ? Promise.resolve(this._advisors)
      : this.content.then( () => this._advisors = this._content.posts.advisor );
  }

  get groups() {
    return this._groups
      ? Promise.resolve(this._groups)
      : this.content.then( () => this._groups = this._content.posts.group );
  }

  /* Returns a structured array of groups with structure orgs[color][state][org] */
  get orgs() {
    if( this._orgs ) {
      return Promise.resolve(this._orgs);
    }
    return this.content.then( () => {
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
      return this._orgs = orgs;
    });
  }

  /* Returns a structured object of menu items with structure menu.parentItem.childItem */
  get menu() {
    return this._menu
      ? Promise.resolve(this._menu)
      : this.content.then( () => {
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
            return this._menu;
        });
  }

  getPage(slug) {
    return this._pages[slug]
      ? Promise.resolve(this._pages[slug])
      : this._fetch( 'page/' + slug ).then( p => this._pages[slug] = p );
  }

  /* Returns an unsorted list of states */
  get states() {
    return this.content.then( () => this._states = this.stateList );
  }

  /* Returns an unsorted list of state color categories */
  get stateColors() {
    return this.content.then( () => this._stateColors = this.statesInColor(0) );
  }

  get stateProps() {
    return this._stateProps 
      ? Promise.resolve(this._stateProps)
      : Promise.all( [ this.states, this.stateColors ] )
               .then( ([states,stateColors]) => this._stateProps = { stateColors, states } ) ;
  }

  get filters() {
    return this.content.then( () => this.groupFilters );
  }

  /* NON PROMISE */

  cachedValue(key) {
    let prop = '_' + key;
    return this[prop] || null;
  }
  
  cachedPage(slug) {
    return this._pages[slug] || null;
  }



  // a somewhat unfortunate historically named property for
  // returning a list of states

  get stateList() {
    return path('.taxonomies.state.terms.*{.parent!=0}',this._content);
  }

  /* Returns a list of state color categories sorted in correct display order */
  get colorSections() {
    var colors = this.statesInColor(0);
    var orderMap = {};
    this.colorOrder.forEach( (c,i) => orderMap[c] = i );
    return colors.sort( (a,b) => orderMap[a.slug] > orderMap[b.slug] );
  }

  // yea, I know it says 'group' but really this returns
  // a dictionary of states.

  get groupDict() {
    if( !this._groupDict ) {
      const stateList = {};
      this.stateList.forEach( g => stateList[g.slug] = g );
      this._groupDict = stateList;
    }
    return this._groupDict;
  }

  get colorSectionsDict() {
    if( !this._colorSectionsDict ) {
      const dict = {};
      this.colorSections.forEach( gs => dict[gs.slug] = gs );
      this._colorSectionsDict = dict;
    }
    return this._colorSectionsDict;
  }

  get colorSectionsIDDict() {
    return this._colorSectionsIDDict || (this._colorSectionsIDDict = this.statesInColor(0).reduce( (dict,color) => (dict[color.term_id] = color, dict), {} ));
  }

  get colorOrder() {
    return this._content.colorOrder;
  }

  /*
    Returns a list of states given a color category.
    If no color category is given, returns an unsorted list of color categories.
   */
  statesInColor(color) {
    var id = (color && color['term_id']) || 0;
    return path('.taxonomies.state.terms.*{.parent=='+id+'}',this._content);
  }

  get groupFilters() {
    if( !this._groupFilters ) {
      const filters = {};
      // remove 'state' from taxonomies
      const tax = this._content.taxonomies;
      Object.keys( tax ).filter( k => k !== 'state').forEach( k => {
          filters[k] = tax[k];
          filters[k].tags = Object.keys(filters[k].terms);
        });
      this._groupFilters = filters;
    }
    return this._groupFilters;
  }

  get filterDict() {
    if( !this._filterDict ) {
      this._filterDict = {};
      path('...terms.*', this.groupFilters ).forEach( f => this._filterDict[f.name] = f.label );
    }
    return this._filterDict;
  }

}

var service = new MovementVoteService();

service.actions = actions;

module.exports = service;
