import path    from 'jspath';
import JSPathDatabase from '../lib/jspath-database';

class ContentDB extends JSPathDatabase {

  constructor() {
    super(...arguments);
    this._visiblity = null;
    this._visibleCache = {};
  }
  
  get tagCategories() {
    return this.query('tagCategories');
  }

  get groups() {
    return this.query('groups');
  }

  get denormalizedGroups() {
    if( !this._normalizedGroups ) {
      this._normalizedGroups = this.denormalize( this.groupSchema, this.groups );
    }
    return this._normalizedGroups;
  }

  get denormalizedStates() {
    if( !this._normalizedStates ) {
      this._normalizedStates = this.denormalize( this.stateSchema, this.states );
    }
    return this._normalizedStates;
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
    if( !this._colors ) {
      this._colors = this.match( 'states', 'parent', 0 );
      this._colors.sort( (c1,c2) => c1.order - c2.order );
    }
    return this._colors;
  }

  visibleGroups(visibility) {
    return this._checkVisibleCache( visibility, 'groups', () => 
      visibility.length 
        ? this.match( 'groups', 'tags', visibility )
        : this.query('groups') );
   }

  visibleStates(visibility) {
    return this._checkVisibleCache( visibility, 'states', () => 
                     this.getRecords( 'states', path( '.state', this.visibleGroups(visibility) ) ) );
  }

  visibleColors(visibility) {
    return this._checkVisibleCache( visibility, 'colors', () => {
      const ids = path( '.parent', this.visibleStates(visibility) );
      return ids.length 
        ? path( '.' + this._buildIds(ids), this.colors )
        : [];
    });
  }

  denormalizeVisibleStates(visibility) {
    return this._checkVisibleCache( visibility, 'normalizedStates', () => 
              visibility.length
                ? this.getRecords( this.denormalizedStates, path( '.id', this.visibleStates(visibility) ) )
                : this.denormalizedStates
              );
  }

  denormalizeVisibleGroups(visibility) {
    return this._checkVisibleCache( visibility, 'normalizedGroups', () =>
              visibility.length
                ? this.getRecords( this.denormalizedGroups, path( '.id', this.visibleGroups(visibility) ) ) 
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

