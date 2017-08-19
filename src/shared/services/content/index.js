import path    from 'jspath';
import JSPathDatabase from '../../lib/jspath-database';
import { serializeContent, serializePage } from './normalizer';

const uniqueIdReducer = (accum,id) => ((!accum.includes(id) && accum.push(id)), accum);

class ContentDB extends JSPathDatabase {

  constructor() {
    super(...arguments);
    this._visiblity = null;
    this._visibleCache = {};
    this._cache = {};
    this._pages = {};
  }
  
  set data( data ) {
    super.data = serializeContent(data);
  }

  addPage( name, data ) {
    return this._pages[name] = serializePage(data);
  }

  getPage( name ) {
    return this._pages[name];
  }

  get tagCategories() {
    return this.query('tagCategories');
  }

  get groups() {
    return this.query('groups');
  }

  get tags() {
    return this.query('tags');
  }

  get donateTiles() {
    return this.query('donateTiles');
  }

  get states() {
    return this.match('states', 'parent', 0, false );
  }

  get colors() {
    return this._checkQueryCache( 'colors', () => this.match( 'states', 'parent', 0 ).sort( (c1,c2) => c1.order - c2.order ) );
  }

  get advisors() {
    return this.query('advisors');
  }
  
  get denormalizedGroups() {
    return this._checkQueryCache( 'denormalizedGroups', () => this.denormalize( this.groupSchema, this.groups ) );
  }

  get denormalizedStates() {
    return this._checkQueryCache( 'denormalizedStates', () => this.denormalize( this.stateSchema, this.states ) );
  }


  visibleGroups(visibility, slug = '') {
    return this._checkVisibleCache( visibility, 'groups' + slug, () => 
      this._trimBySlug( slug, visibility.length 
                                  ? this.match( 'groups', 'tags', visibility )
                                  : this.query('groups') ) );
   }

  visibleStates(visibility, slug = '') {
    return this._checkVisibleCache( visibility, 'states' + slug, () => 
                     this.getRecords( 'states', path('.state', this.visibleGroups(visibility,slug)).reduce(uniqueIdReducer,[]) ) );
  }

  visibleColors(visibility, slug = '') {
    return this._checkVisibleCache( visibility, 'colors' + slug, () => {
      const ids = path( '.parent', this.visibleStates(visibility,slug) );
      return ids.length 
        ? path( '.' + this._buildIds(ids), this.colors )
        : [];
    });
  }

  /*
    A slug might be a state or a color
  */
  visibleCategories(slug) {
    if( !slug ) {
      return this.tagCategories;
    }

    const p = this._isColorSlug(slug) 
                      ? '.{.state.parent.slug==$slug}.tags.category.id'
                      : '.{.state.slug==$slug}.tags.category.id';

    return path(p,this.denormalizedGroups,{slug}).reduce(uniqueIdReducer,[]);
  }

  /*
    A slug might be a state or a color
  */
  visibleFilters(slug) {
    if( !slug ) {
      return null;
    }
    const p = this._isColorSlug(slug) 
                      ? '.{.state.parent.slug==$slug}.tags.id'
                      : '.{.state.slug==$slug}.tags.id';

    return path(p,this.denormalizedGroups,{slug}).reduce(uniqueIdReducer,[]);
  }

  denormalizeVisibleStates(visibility, slug = '') {
    return this._checkVisibleCache( visibility, 'normalizedStates' + slug, () => 
              visibility.length
                ? this.getRecords( this.denormalizedStates, path( '.id', this.visibleStates(visibility,slug) ) )
                : this.denormalizedStates
              );
  }

  denormalizeVisibleGroups(visibility, slug = '') {
    return this._checkVisibleCache( visibility, 'normalizedGroups' + slug, () =>
              visibility.length
                ? this.getRecords( this.denormalizedGroups, path( '.id', this.visibleGroups(visibility,slug) ) ) 
                : this.denormalizedGroups
               );
  }

  selectedGroups(selected) {
    if( this._selected === selected ) {
      if( this._selectedCache ) {
        return this._selectedCache;
      }
    } 
    this._selected = selected;
    return this._selectedCache = this.getRecords( 'groups', selected );
  }

  selectedStates(selected) {
    return this.getRecords( 'states', path('.state', this.selectedGroups(selected) ));
  }

  denormalizedSelectedGroups(selected) {
    return this.getRecords( this.denormalizedGroups, path( '.id', this.selectedGroups(selected) ) );
  }

  denormalizedSelectedStates(selected) {
    return this.getRecords( this.denormalizedStates, path( '.state', this.selectedGroups(selected) ) );
  }
  
  _isColorSlug(slug) {
    return this.queryItem('states', '.{.slug==$slug}.parent', {slug}) === 0;
  }

  _trimBySlug( slug, results, field = 'state' ) {
    if( !slug ) {
      return results;
    }
    const stateArr = this.match( 'states', 'slug', `"${slug}"` );
    if( stateArr.length !== 1 ) {
      return results;
    }
    const state = stateArr[0];
    let ids = state.parent === 0
          ? this.query( 'states', '.{.parent==$parent}.id', {parent:state.id} )
          : [state.id];
    return this.getRecords( results, ids, field );

  }

  _checkQueryCache( key, cb ) {
    if( !this._cache[key] ) {
      this._cache[key] = cb();
    }
    return this._cache[key];
  }

  _checkVisibleCache(visibility,field,cb) {
    if( this._visiblity === visibility ) {
      if( this._visibleCache[field] ) {
        return this._visibleCache[field];
      }
    } else {
      this._visiblity = visibility;
      this._visibleCache = {}; // empty the cache;      
    }
    return this._visibleCache[field] = cb(visibility);
  }

  _slugToId( table, slug ) {
    return this.query( table, '.{.slug=$slug}.id', {slug} );
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

module.exports = ContentDB;

