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

      this._db = new MovementDatabase((new Normalizer(content)).db);

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

const uniqueReducer = (accum,value) => (!accum.includes(value) && accum.push(value), accum);

class ContentDatabase {

  constructor(data) {
    this._data = data;
  }

  tableQuery( table, query ) {
    const result = query
          ? path( '.' + table + query, this._data )
          : this._data[table];
    return result.length && typeof result[0] === 'object'
             ? result.map( r => ({...r}) )
             : result;
  }

  getRecord( table, id, key = 'id' ) {
    const result = this.getRecords(table,[id],key);
    return result.length && result[0];
  }

  getRecords( table, ids, key = 'id' ) {
    const pred = this._buildIds(ids,key);
    return pred ? this.tableQuery( table, pred ) : [];
  }

  _buildIds( ids, key = 'id' ) {
    return ids && ids.length && '{' + ids.map( id => `.${key}==${id}` ).join( ' || ') + '}';
  }

  getChildren( table, parent ) {
    const pred = '{.parent==$parent}';
    return this.tableQuery( table, pred, {parent} );
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
    if( Array.isArray(value) ) {
      return this.matches(table,field,value);
    }
    const op = eq ? '==' : '!=';
    const pred = `{.${field}${op}${value}}`;
    return this.tableQuery( table, pred );
  }

  unique( table, field ) {
    return this.tableQuery(table,'.' + field).reduce(uniqueReducer, [] );
  }

  matches( table , field, values ) {

    const intersect = (arr1,arr2) => {
      for( var i = arr1.length-1; i >= 0; i-- ) {
        if( arr2.indexOf(arr1[i]) === -1 ) {
          return false;
        }
      }
      return true;
    };

    const recs = this.tableQuery(table);

    return values.length 
              ? recs.filter( rec => intersect(values,rec[field]) )
              : recs;

  }

  denormalize( schema, record ) {

    if( Array.isArray(record) ) {
      return record.map( R => this.denormalize(schema, R), this );
    }

    let result = {...record};
    Object.keys( schema ).forEach( field => {
      result = this.denormalizeRecord( field, schema[field].table, result );
      if( schema[field].schema ) {
        result[field] = this.denormalize( schema[field].schema, result[field] );
      }
    });
    return result;
  }

  denormalizeRecord( field, table, record ) {
    const key = record[field];
    const value = this[ Array.isArray(key) ? 'getRecords' : 'getRecord'](table, key);

    return {...record, [field]: value};
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

class MovementDatabase extends ContentDatabase {

  constructor() {
    super(...arguments);
    this._visiblity = null;
    this._cache = {};
  }
  
  get tagCategories() {
    return this.tableQuery('tagCategories');
  }

  get groups() {
    return this.tableQuery('groups');
  }

  get tags() {
    return this.tableQuery('tags');
  }

  get donateTiles() {
    return this.tableQuery('donateTiles');
  }

  get colors() {
    if( !this._colors ) {
      this._colors = this.match( 'states', 'parent', 0 );
      const order = this.tableQuery('colorOrder');
      this._colors.sort( (c1,c2) => order.indexOf(c1.id) > order.indexOf(c2.id) ? 1 : -1 );
    }
    return this._colors;
  }

  _checkVisibleCache(visibility,field,cb) {
    if( this._visiblity === visibility ) {
      if( this._cache[field] ) {
        return this._cache[field];
      }
    } else {
      this._visiblity = visibility;
      this._cache = {}; // empty the cache;      
    }
    return this._cache[field] = cb(visibility);
  }

  visibleGroups(visibility) {
    return this._checkVisibleCache( visibility, 'groups', () => 
      visibility.length 
        ? this.match( 'groups', 'tags', visibility )
        : this.tableQuery('groups') );
  }

  visibleStates(visibility) {
    return this._checkVisibleCache( visibility, 'states', () => 
      this.getRecords( 'states', path( '.state', this.visibleGroups(visibility) ) ) );
  }

  visibleColors(visibility) {
    return this._checkVisibleCache( visibility, 'colors', () => {
      const ids = path( '.parent', this.visibleStates(visibility) );
      const pred = '.' + this._buildIds(ids);
      return path( pred, this.colors );
    });
  }

  denormalizeVisibleStates(visibility) {
    return this._checkVisibleCache( visibility, 'normalizedStates', () => 
      this.denormalize( this.stateSchema, this.visibleGroups(visibility) ) );
  }

  denormalizeVisibleGroups(visibility) {
    return this._checkVisibleCache( visibility, 'normalizedGroups', () => 
      this.denormalize( this.groupSchema, this.visibleGroups(visibility) ) );
  }

  get tagsSchema() {
    return {
      category: { table: 'tagCategories' }
    };
  }

  get stateSchema() {
    return {
      parent: { table: 'states'}
    };
  }

  get groupSchema() {
    return {
      tags: { table: 'tags', schema: this.tagsSchema },
      state: { table: 'states', schema: this.stateSchema }
    };
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
      grp.state = tax.state.terms[ 'national' ].term_id;
      grp.tags = [];
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

