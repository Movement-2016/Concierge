var path     = require('jspath');
var Tabletop = require('tabletop');

let _fetch = null;
if( typeof window !== 'undefined') {
  /* global $ */
  _fetch = (url) => {
    return new Promise( (success,error) => $.ajax({url,success,error,xhrFields: {withCredentials:true}} ) );
  };
} else {
  _fetch = require('node-fetch'.trim()); // prevent browserify bundling
}

const WP_API_HOST =   'movement2018.wpengine.com'; 

const WP_API_BASE = 'https://' + WP_API_HOST + '/wp-json/movement-2.1/';

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
    this._orgs = null;
    this._taxonomy = null;
    this._pages = {};
    this._homeContent = null;
  }

  _fetch(part) {
    return _fetch( this._base + part )
            .then( checkStatus )
            .then( parseJSON );
  }

  init() {
    if( this._orgs ) {
      return Promise.resolve(this);
    }
    return Promise.all( [ this._fetch( 'tags' ),
                          this.content,
                          this.orgs, 
                          this.donateStats,                          
                          this.testimonials ] )
        .then ( ([ tags ])  => {
          this._taxonomy = tags;
          return this;
        });    
  }

  get content() {
    return this._content
      ? Promise.resolve(this._content)
      : this._fetch( 'content' ).then( p => this._content = p );
  }

  get homeContent() {
    return this._homeContent
      ? Promise.resolve(this._homeContent)
      : this.content
          .then( () => this._fetch( 'page/' + this._content.pages.home.pageId ))
          .then( p => this._homeContent = p );
  }
  
  getPage(id) {
    return this.pages[id]
      ? Promise.resolve(this.pages[id])
      : this._fetch( 'page/' + id ).then( p => this.pages[id] = p.content );
  }
  
  get stateRaces() {
    if( this._stateStats ) {
      return Promise.resolve(this._stateStats);
    }
    const public_spreadsheet_url = '1YXEv6GslFf_ZnBWgOM0JYQyuBL0mZMycxZZoHuJHNbs';
    return new Promise( (resolve, reject) => {
      try {
        Tabletop.init({
            key: public_spreadsheet_url,
            parseNumbers: true,
            callback: (data, tabletop) => {
              this._stateStats = {};
              tabletop.sheets('statecategories').all().reduce( (obj,race) => (obj[race.statelink] = race, obj), this._stateStats );
              resolve(this._stateStats);
            },
        });        
      } catch( e ) {
        reject(e);
      }
    });
  }

  get donateStats() {
    return this._donationstats
      ? Promise.resolve(this._donationstats)
      : this._fetch( 'donationstats' ).then( d => this._donationstats = d ); 
  }

  get testimonials() {
    return this._testimonials
      ? Promise.resolve(this._testimonials)
      : this._fetch( 'testimonials' ).then( t => this._testimonials = t.testimonials );
  }
  
  get orgs() {
    return this._orgs 
      ? Promise.resolve(this._orgs)
      : this._fetch( 'orgs' ).then( o => this._orgs = o );
  }
  
  get advisors() {
    return this._advisors
      ? Promise.resolve(this._advisors)
      : this._fetch( 'advisors' ).then( a => this._advisors = a );
  }

  get tandemForms() {
    return this._tandemforms
      ? Promise.resolve(this._tandemforms)
      : this._fetch( 'tandemforms' ).then( a => this._tandemforms = a.tandemforms );
  }

  get filters() {
    return this._taxonomy.filters;
  }

  /* NON PROMISE */

  get filterDict() {
    if( !this._filterDict ) {
      this._filterDict = {};
      path('...terms.*', this.filters ).forEach( f => this._filterDict[f.name] = f.label );
    }
    return this._filterDict;
  }

  get groupings() {
    return this._taxonomy.groupings.state;
  }

  get groupSections() {
    return this._content.groupSections;
  }

  get pages() {
    return this._content.pages;
  }
}

module.exports = new M2016Service();