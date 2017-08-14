import path    from 'jspath';
import axios   from 'axios';

let _fetch = axios;

import {
  M_SERVICE_END_POINT 
} from '../../config';

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
  return response.data; 
}

// function debugLog(result) {
//   console.log( 'AXIOS RESULT: ', result );
//   return result;
// }

class MovementVoteService {
  constructor() {
    this._base = M_SERVICE_END_POINT;
    this._pages = {};
    this._promises = {};

    this._database = {};
  }

  _fetch(part) {
    return _fetch( this._base + part )
            // .then( debugLog )
            .then( checkStatus )
            .then( parseJSON );
            // .catch( debugLog );
  }

  init( ) {
    return this;
  }

  query( jspath ) {
    return this.content.then( content => path( jspath, content ) );
             //   .catch( err => console.log( 'error duing query', jspath, ' ERROR: ', err ) );
  }

  queries( hash ) {
    var keys = Object.keys(hash);
    const vals = keys.map( k => this.query(hash[k]) );
    const reducer = (accum,val,index) => (accum[keys[index]] = val, accum);
    return Promise.all(vals)
                  .then( results => results.reduce(reducer,{}) );
  }

  get content() {

    const gotContent = content => {

      this._db = (new Normalizer(content)).db;
      this._promises.content = null; 
      return this._content = content;

    };

    if( this._promises.content ) {
      return this._promises.content;
    }

    return this._content
      ? Promise.resolve(this._content)
      : (this._promises.content = this._fetch( 'content' )).then( gotContent );
  }

  getPage(slug) {
    return this._pages[slug]
      ? Promise.resolve(this._pages[slug])
      : this._fetch( 'page/' + slug ).then( p => this._pages[slug] = p );
  }

}

class Normalizer {

  constructor(content) {
    this._content = content;
  }

  get db() {
    this._db = {
      menu: this.fixMenu(),
      donateTiles: this.fixDonateTiles(),
      news: this.fixNews(),
      colorOrder: this.fixOrderColor(), 
      states: this.fixStates(),
      tagCategories: this.fixCategories(),
      tags: this.fixTags(),
      advisors: this.fixAdvisors(),
      groups: this.fixGroups()
    };

    return this._db;
  }

  fixID(rec) {
    return this.mapRec( { ID: 'id', 'term_id': 'id' }, [] , rec );
  }

  mapRec(map,skip,rec) {
    const nums = [ 'parent', 'order '];
    const reducer = (target,key) => {
      if( skip && skip.includes(key) ) {
        return target;
      }
      target[ map[key] || key ] = nums.includes(key) ? Number(rec[key]) : rec[key];
      return target;
    };

    return Object.keys(rec).reduce( reducer, {} );
  }

  fixPostBare(post) {
    const map = {
      ID: 'id',
      post_content: 'body',
      post_title: 'title',
      post_name: 'slug'
    };
    const skip = [ 'fields' ];
    return this.mapRec(map,skip,post);
  }

  fixPost(post) {
    return { ...this.fixPostBare(post), ...post.fields };
  }

  fixMenu() {
    return this._content.menu.map( this.fixID, this );
  }

  fixDonateTiles() {
    return this._content.posts.donatetile.map( this.fixPost, this );
  }

  fixNews() {
    return this._content.posts.news.map( p => (delete p.fields.category, p) ).map( this.fixPost, this );
  }

  fixOrderColor() {
    return this._content.colorOrder.map( name => this.statesDict[name].term_id );
  }

  fixStates() {
    return Object.keys(this.statesDict).map( k => this.statesDict[k] ).map( this.fixID, this );
  }

  get statesDict() {
    return this._content.taxonomies.state.terms;
  }

  fixCategories() {
    const tax = this._content.taxonomies;

    this._types = {
      'issue-area': { id: 1, tag: true },
      constituency: { id: 2, tag: true },
      'nonprofit-type': { id: 3, tag: true } 
    };

    return Object.keys( this._types ).map( slug => ({ ...this._types[slug], slug, name: tax[slug].label }) );
  }

  fixTags() {
    const tax = this._content.taxonomies;
    const tags = [];
    const map = {
      term_id: 'id'
    };
    const skip = [ 'description', 'parent' ];
    Object.keys(this._types).forEach( slug => {
      const type = this._types[slug];
      Object.keys(tax[slug].terms).reduce( (arr,term) => (arr.push( { ...this.mapRec(map,skip,tax[slug].terms[term]), category: type.id } ), arr), tags );
    });
    return tags;
  }

  fixAdvisor(rec) {
    const map = {
      post_name: 'id',
      post_title: 'name'
    };
    const skip = [ 'ID', 'post_content', 'post_name' ];
    return { ...this.mapRec( map, skip, rec), sort: rec.post_name.split('-').pop() };
  }

  fixAdvisors() {
    return this._content.posts.advisor.map( this.fixAdvisor, this );
  }

  fixGroup(rec) {
/*
     "group": [
        {
            "ID": 281,
            "post_content": "215PA is a new multiracial collaborative led by parents, teachers, students, union members, and other Philadelphians coming together to make meaningful change. 215 People\u2019s Alliance is lifting up education rights and local control of Philadelphia schools at the ballot box and in the streets during the\u00a02016 election cycle.",
            "post_title": "215 People\u2019s Alliance",
            "post_name": "215-peoples-alliance",
            "fields":
            {
                "website": "http:\/\/215pa.com\/",
                "c4_donate_link": "https:\/\/secure.actblue.com\/contribute\/page\/mvmt-pa-215-peoples-alliance-c4",
                "c3_donate_link": "",
                "pac_donate_link": "",
                "state": ["pennsylvania"],
                "image": "https:\/\/wp.movementvote.org\/wp-content\/uploads\/215PeoplesAlliance-logo-250x250.jpg",
                "nonprofit-type": ["501c4"],
                "constituency": ["african-american", "youth"],
                "issue-area": ["economic-justice", "mass-criminalization", "racial-justice"]
            }
        },
*/
    const map = {};
    const skip = [ 'state', 'nonprofit-type', 'constituency', 'issue-area' ];
    let grp = { ...this.fixPostBare(rec), ...this.mapRec(map,skip,(rec.fields || {})) };

    const tax = this._content.taxonomies;

    if( rec.fields ) {
      grp.tags = [];
      Object.keys( this._types ).forEach( cat => {
        ((rec.fields || {})[cat] || []).forEach( tag => {
          grp.tags.push(tax[cat].terms[tag].term_id);
        });
      });

      grp.state = tax.state.terms[ rec.fields.state[0] ].term_id;      
    } else {
      grp.state = 999999;
    }

    return grp;
  }

  fixGroups() {
    return this._content.posts.group.map( this.fixGroup, this );
  }

}
var service = new MovementVoteService();

module.exports = service;

