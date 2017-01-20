var path     = require('jspath');

let _fetch = null;

if( typeof window !== 'undefined') {

  /* global $ */
  _fetch = (url) => {
    return new Promise( (success,error) => $.ajax({url,success,error}) ); //  ,xhrFields: {withCredentials:false}} ) );
  };
} else {
  _fetch = require('node-fetch'.trim()); // prevent browserify bundling
}

const WP_DEV = true;

const WP_API_HOST =   WP_DEV ? 'http://localhost:8080/wordpress' : 'https://movement2018.wpengine.com';

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

class M2016Service {
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
      : this.content.then( () => this._donateTiles = this._content.posts.donatetiles );
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

  // 'orgs' returns the groups in a structure based on color -> state -> org
  // and also normalizes the 'fields' structure replacing term_ids with the 
  get orgs() {
    if( this._orgs ) {
      return Promise.resolve(this._orgs);
    }
    return this.content.then( () => {
      const orgs = {};
      const colors = this.groupSections;
      colors.forEach( color => {
        orgs[color.slug] = {};
        const states = this.statesForColorSync(color);
        states.forEach( state => {
          const foundOrgs =  path('.posts.group{.fields.state=="'+state.slug+'"}', this._content);
          foundOrgs.length && (orgs[color.slug][state.slug] = foundOrgs);
        });
      });
      return this._orgs = orgs;
    });
  }

  get menu() {
    return this._menu
      ? Promise.resolve(this._menu)
      : this.content.then( () => {
            var menu = {};
            this._content.menu.items.forEach( item => {
              const parent = parseInt(item.menu_item_parent);
              var id = item.ID;
              if( parent === 0 ) {
                if( !menu[id] ) {
                  menu[id] = item;
                  menu[id].children = [];
                }
              } else {
                if( !menu[parent] ) {
                  var parentItem = path('.menu.items{.ID=='+parent+'}',this._content)[0];
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


  get donateStats() {
    return this.getPage('home').then( page => page.fields );
  }

  get states() {
    return this.content.then( () => this.groupings );
  }

  get stateColors() {
    return this._statesForColor(0);
  }

  statesForColor(color) {
    return this._stateForColor(color);
  }

  _statesForColor(color) {
    return this.content.then( () => this.statesForColorSync(color) );
  }

  get filters() {
    return this.content.then( () => this.filtersSync );
  }

  /* NON PROMISE */

  // a somewhat unfortunate historically named property for
  // returning a list of states
  get groupings() {
    return path('.taxonomies.state.terms.*{.parent!=0}',this._content);
  }

  // an even more unfortunate historically named property for
  // returning a list of state colors
  get groupSections() {
    var colors = this.statesForColorSync(0);    
    var orderMap = {};
    this._content.colorOrder.forEach( (c,i) => orderMap[c] = i );
    return colors.sort( (a,b) => orderMap[a.slug] > orderMap[b.slug] );
  }

  get groupSectionsDict() {
    if( !this._groupSectionsDict ) {
      const dict = {};
      this.groupSections.forEach( gs => dict[gs.slug] = gs );
      this._groupSectionsDict = dict;
    }
    return this._groupSectionsDict;
  }

  get sectionOrder() {
    return this._content.colorOrder;
  }

  // return a list of states given a 'color'
  statesForColorSync(color) {
    var id = (color && color['term_id']) || 0;
    return path('.taxonomies.state.terms.*{.parent=='+id+'}',this._content);
  }

  get filtersSync() {
    if( !this._filterSync ) {
      const filters = {};
      // remove 'state' from taxonomies
      const tax = this._content.taxonomies;
      Object.keys( tax ).filter( k => k !== 'state').forEach( k => {
          filters[k] = tax[k];
          filters[k].tags = Object.keys(filters[k].terms);
        });
      this._filterSync = filters;      
    }
    return this._filterSync;
  }

  get groupDict() {
    if( !this._groupDict ) {
      const groupings = {};
      this.groupings.forEach( g => groupings[g.slug] = g );
      this._groupDict = groupings;
    }
    return this._groupDict;
  }

  get filterDict() {
    if( !this._filterDict ) {
      this._filterDict = {};
      path('...terms.*', this.filtersSync ).forEach( f => this._filterDict[f.name] = f.label );
    }
    return this._filterDict;
  }

  // get pages() {
  //   return this._content.pages;
  // }
}

module.exports = new M2016Service();
