import path from 'jspath';

const fastArrCmp = (a,b) => {
  for( var n = 0; n < b.length; n++ ) {
    if( a.includes(b[n]) ) {
      return true;
    }
  }
  return false;
};

/*
  A filter is an array of tags. The fiters are grouped by 
  a key. (type of org, constituency, etc.)

  If any one of the keyed groups of tags doesn't match
  the org's tags then the group is not visible.
*/
const getVisibleOrgs = (orgs,filters) => {

  var visible = {};
  var tags = Object.keys(filters).map( k => filters[k] ); 
  
  for( var section in orgs ) {
    for( var state in orgs[section] ) {
      for( var i in orgs[section][state] ) {

        const org  = orgs[section][state][i];
        let   ok   = true;

        for( var n = 0; n < tags.length; n++ ) {
          if( !fastArrCmp(org.tags,tags[n]) ) {
            ok = false;
            break;
          }
        }

        if( ok ) {
          !visible[section] && (visible[section] = {});
          !visible[section][state] && (visible[section][state] = []);
          visible[section][state].push(org);
        }

      }
    }
  }
  
  return visible;
};

const getVisibleStates = orgs => {
  return path('..state',orgs).reduce( (a,e) => { a.indexOf(e) < 0 && a.push(e); return a; }, [] ).sort();
};

const getSelectedOrgs = (ids,orgs) => {
  var p = '..{' + ids.map( id => '.id == ' + id ).join('||') + '}';
  return path( p, orgs );
};

module.exports = {
  getVisibleStates,
  getVisibleOrgs,
  getSelectedOrgs
};