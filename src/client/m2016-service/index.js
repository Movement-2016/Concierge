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

const WP_API_HOST =   'movement2016.org'; 

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
    return Promise.all( [ this._fetch( 'orgs' ), 
                          this._fetch( 'donationstats'),
                          this._fetch( 'tags' ),
                          this._fetch( 'content' ) ] )
        .then ( ([ orgs, donationstats, tags, content ])  => {
          this._orgs = orgs;
          this._donationstats = donationstats;
          this._taxonomy = tags;
          this._content = content;
          this._taxonomy.states = this._taxonomy.state;
          return this;
        });    
  }

  getPage(id) {
    return this._fetch( 'page/' + id ).then( p => p.content );
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
    return this._donationstats;
  }

  get filters() {
    return this._taxonomy.filters;
  }

  get filterDict() {
    if( !this._filterDict ) {
      this._filterDict = {};
      path('...terms.*', this.filters ).forEach( f => this._filterDict[f.name] = f.label );
    }
    return this._filterDict;
  }

  getOrgs() {
    return this._orgs 
      ? Promise.resolve(this._orgs)
      : this._fetch( 'orgs' ).then( o => this._orgs = o );
  }
  
  get advisors() {
    return this._advisors
      ? Promise.resolve(this._advisors)
      : this._fetch( 'advisors' ).then( a => this._advisors = a );
  }
  
  get orgs() {
    return this._orgs;
  }

  get groupings() {
    return this._taxonomy.groupings.state;
  }

/*

  return array( 
      'groupSections' => $groupSections,
      'mainMenu'      => $mainMenu,
      'pages' => array(
          'home'         => $homePage,
          'testimonials' => $testimonialsPage,
          'donate'       => $donatePage,
          'info'         => $infoPage,
          'advisors'     => $advisorsPages,
          'meetTheTeam'  => $meetTheTeamPage,
          'aboutUs'      => $aboutUsPage
        )
    );
*/
  get groupSections() {
    return this._content.groupSections;
  }

  get content() {
    return this._content;
  }

  get pages() {
    return this._content.pages;
  }
}

module.exports = new M2016Service();