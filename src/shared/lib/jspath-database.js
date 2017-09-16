import path    from 'jspath';

const uniqueReducer = (accum,value) => (!accum.includes(value) && accum.push(value), accum);

class JSPathDatabase {

  constructor(data=null) {
    this._data = data;
    this._immutable = true;
    this._immutableState = [];
  }

  set data(data) {
    this._data = data;
  }

  query( table, query, repl ) {
    let result = null;
    if( typeof table === 'string' ) {
      result = query
        ? path( '.' + table + query, this._data, repl )
        : this._data[table];
    } else {
      if( !query ) {
        return table; // <-- N.B. Cloudy Tuesdays in the forecast
      }
      result = path( '.' + query, table, repl );
    }

    if( this._immutable ) {
      return result.length && typeof result[0] === 'object'
               ? result.map( r => ({...r}) )
               : result;      
    }
    return result;
  }

  queryItem( table, query, repl ) {
    const result = this.query(table,query,repl);
    return result && result.length === 1 && result[0];
  }

  getRecord( table, id, key = 'id' ) {
    const result = this.getRecords(table,[id],key);
    return result.length && result[0];
  }

  getRecords( table, ids, key = 'id' ) {
    const pred = this._buildIds(ids,key);
    return pred ? this.query( table, pred ) : [];
  }

  _buildIds( ids, key = 'id' ) {
    return ids && ids.length && '{' + ids.map( id => `.${key}==${id}` ).join( ' || ') + '}';
  }

  getChildren( table, parent ) {
    const pred = '{.parent==$parent}';
    return this.query( table, pred, {parent} );
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
    return this.query( table, pred );
  }

  unique( table, field ) {
    return this.query(table,'.' + field).reduce(uniqueReducer, [] );
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

    const recs = this.query(table);

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
    this._pushImmutable(false);
    const value = this[ Array.isArray(key) ? 'getRecords' : 'getRecord'](table, key);
    this._popImmutable();
    return {...record, [field]: value};
  }

  buildTree( table, rootNode ) {

    let result = null;
    this._pushImmutable(false);
    if( !rootNode ) {
      result = this.match(table,'parent',0).map( R => this.buildTree(table,R) );
    } else {
      const children = this.getChildren(table,rootNode.id);

      if( children.length ) {
        result = { ...rootNode, children: children.map( C => this.buildTree(table,C) ) };
      } else {
        result = rootNode;
      }
    }
    this._popImmutable();
    return result;
  }

  _pushImmutable(state) {
    this._immutableState.push( this._immutable );
    this._immutable = state;
  }

  _popImmutable() {
    this._immutable = this._immutableState.pop();
  }
}

module.exports = JSPathDatabase;

