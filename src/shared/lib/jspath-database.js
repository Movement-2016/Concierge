import path    from 'jspath';

const uniqueReducer = (accum,value) => (!accum.includes(value) && accum.push(value), accum);

class JSPathDatabase {

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

module.exports = JSPathDatabase;

