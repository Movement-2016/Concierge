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

  get db() {
    return this._db;
  }

  get content() {

    const gotContent = content => {

      this._db = new ContentDatabase((new Normalizer(content)).db);

      try {
      var grp = this._db.match( 'groups', 'state', 41 )[0];
      grp = this._db.resolve( this._db.sample(), grp );
      grp;
    } catch( e ) {
      // noop
    }

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

class ContentDatabase {

  constructor(data) {
    this._data = data;
  }

  tableQuery( table, query ) {
    const q = '.' + table + query;
    return  path( q, this._data ).map( r => ({...r}) );
  }

  getRecord( table, id ) {
    return this.getRecords(table,[id])[0];
  }

  getRecords( table, ids ) {
    const pred = '{' + ids.map( id => '.id ==' + id ).join( ' || ') + '}';
    return this.tableQuery( table, pred );
  }

  getChildren( table, parent ) {
    const pred = '{.parent==$parent}';
    return this.tableQuery( table, pred, {parent} );
  }

  resolveRecord( field, table, record ) {
    const key = record[field];
    // const value = Array.isArray( record[field] ) 
    //                 ? this.getRecord( table, record[field] ) 
    //                 : this.getRecords( table, record[field] );

    const value = this[ Array.isArray(key) ? 'getRecords' : 'getRecord'](table, key);

    return {...record, [field]: value};
  }

  /*
      examples;

      -- find all the colors: 

      colors = match( 'states', 'parent', 0 );

      -- find all the states for a given color: 

      states = match( 'states', 'parent', colors[3].id );

      -- find all the orgs in a given state:

      orgs = match( 'orgs', 'state', states[33].id );      

  */
  match( table, field, value, eq = true ) {
    const op = eq ? '==' : '!=';
    const pred = `{.${field}${op}${value}}`;
    return this.tableQuery( table, pred );
  }

  sample() {
    const tagsSchema = {
      category: { table: 'tagCategories' }
    };
    const orgSchema = {
      tags: { table: 'tags', schema: tagsSchema }
    };

    return orgSchema;
  }

  resolve( schema, record ) {

    if( Array.isArray(record) ) {
      return record.map( R => this.resolve(schema, R), this );
    }

    let result = null;
    Object.keys( schema ).forEach( field => {
      result = this.resolveRecord( field, schema[field].table, record );
      if( schema[field].schema ) {
        result[field] = this.resolve( schema[field].schema, result[field] );
      }
    });
    return result;
  }

  buildTree( table, rootNode ) {

    if( !rootNode ) {
      return this.match(table,'parent',0).map( R => this.buildTree(table,R) );
    }

    const children = this.getChildren(table,rootNode.id);

    if( children.length ) {
      return { ...rootNode, children: children.map( C => this.buildTree(table,C) ) };
    }

    return rootNode;
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
      groups: this.fixGroups(),
      testimonials: this.fixTestimonials()

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
      'nonprofit-type': { id: 3, tag: false } 
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

  fixTestimonial(rec) {
    const map = {
      ID: 'id',
      post_content: 'body',
      post_title: 'author',
      post_name: 'slug',      
    };
    const skip = [ 'fields' ];
    const fmap = { 
      author_title: 'title',
      image: 'image'
    };
    return { ...this.mapRec( map, skip, rec ), ...this.mapRec( fmap, [], rec.fields ) };
  }

  fixTestimonials() {
    return this._content.posts.testimonial.map( this.fixTestimonial, this );
  }

}
var service = new MovementVoteService();

module.exports = service;

