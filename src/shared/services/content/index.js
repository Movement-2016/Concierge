import path    from 'jspath';
import JSPathDatabase from '../../lib/jspath-database';
import { serializeContent, serializePage } from './normalizer';

const uniqueIdReducer = (accum,id) => ((!accum.includes(id) && accum.push(id)), accum);

class ContentDB extends JSPathDatabase {

  constructor() {
    super(...arguments);
    this._filters = null;
    this._filtersCache = {};
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


  visibleGroups(filters, slug = '') {
    return this._checkFiltersCache( filters, 'groups' + slug, () => 
      this._trimBySlug( slug, filters.length 
                                  ? this.match( 'groups', 'tags', filters )
                                  : this.query('groups') ) );
   }

  visibleStates(filters, slug = '') {
    return this._checkFiltersCache( filters, 'states' + slug, () => 
                     this.getRecords( 'states', path('.state', this.visibleGroups(filters,slug)).reduce(uniqueIdReducer,[]) ) );
  }

  visibleColors(filters, slug = '') {
    return this._checkFiltersCache( filters, 'colors' + slug, () => {
      const ids = path( '.parent', this.visibleStates(filters,slug) );
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

  denormalizeVisibleStates(filters, slug = '') {
    return this._checkFiltersCache( filters, 'normalizedStates' + slug, () => 
              filters.length
                ? this.getRecords( this.denormalizedStates, path( '.id', this.visibleStates(filters,slug) ) )
                : this.denormalizedStates
              );
  }

  denormalizeVisibleGroups(filters, slug = '') {
    return this._checkFiltersCache( filters, 'normalizedGroups' + slug, () =>
              filters.length
                ? this.getRecords( this.denormalizedGroups, path( '.id', this.visibleGroups(filters,slug) ) ) 
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

  _checkFiltersCache(filters,field,cb) {
    if( this._filters === filters ) {
      if( this._filtersCache[field] ) {
        return this._filtersCache[field];
      }
    } else {
      this._filters = filters;
      this._filtersCache = {}; // empty the cache;      
    }
    return this._filtersCache[field] = cb(filters);
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

