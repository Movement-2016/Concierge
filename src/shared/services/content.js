import path    from 'jspath';
import JSPathDatabase from '../lib/jspath-database';

class ContentDB extends JSPathDatabase {

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
      this._colors.sort( (c1,c2) => c1.order - c2.order );
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
      return ids && ids.length 
        ? path( '.' + this._buildIds(ids), this.colors )
        : [];
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

module.exports = ContentDB;

