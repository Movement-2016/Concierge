import path from 'jspath';

const fastArrCmp = (a,b) => {
  for( var n = 0; n < b.length; n++ ) {
    if( a.includes(b[n]) ) {
      return true;
    }
  }
  return false;
};

const _iterateOrgs = (orgs,callback) => {

  var visible = {};

  for( var section in orgs ) {
    for( var state in orgs[section] ) {
      for( var i in orgs[section][state] ) {

        const org  = orgs[section][state][i];

        if( !callback || callback(org) ) {
          !visible[section] && (visible[section] = {});
          !visible[section][state] && (visible[section][state] = []);
          visible[section][state].push(org);
        }

      }
    }
  }

  return visible;

};

/*
  A filter is an array of tags. The fiters are grouped by
  a key. (type of org, constituency, etc.)

  If any one of the keyed groups of tags doesn't match
  the org's tags then the group is not visible.
*/
const getVisibleOrgs = (orgs,filters) => {

  var keys = Object.keys(filters);
  var tags = keys.map( k => filters[k] );

  return _iterateOrgs( orgs, org => {
    for( var n = 0; n < tags.length; n++ ) {
      if( !org.tags ) {
        org.tags = keys.reduce( (acc, key) => acc.concat( org.fields[key] || []), [] );
      }
      if( tags[n].length && !fastArrCmp(org.tags,tags[n]) ) {
        return false;
      }
    }
    return true;
  });

};

// Trims orgs object to only include part indicated in pageSlug
const trimOrgs = (orgs, pageSlug) => {
  if( !pageSlug ) {
    return orgs;
  }
  
  var trimmedOrgs = {};

  if (typeof(orgs[pageSlug]) !== 'undefined') { // this is true for a color section slug like 'dark-blue-states'
    trimmedOrgs[pageSlug] = orgs[pageSlug];
    return trimmedOrgs;
  } else {
    for (var colorSection in orgs) {
      if (typeof(orgs[colorSection][pageSlug]) !== 'undefined') { // this is true for a single state slug like 'new-york'
        trimmedOrgs[colorSection] = {};
        trimmedOrgs[colorSection][pageSlug] = orgs[colorSection][pageSlug];
        return trimmedOrgs;
      }
    }
  }
  return orgs; // returns all orgs for other slugs like 'all-states' or 'random-3ghA'
};

const getVisibleStates = orgs => {
  return path('..state',orgs).reduce( (a,e) => { a.indexOf(e) < 0 && a.push(e); return a; }, [] ).sort();
};

const planFromOrg = (plan,id) => path( `..{.id==${id}}`,plan )[0];


const getSelectedOrgs = (ids =[],orgs) => {
  if( !ids.length ) { return []; }
  var p = '..{' + ids.map( id => '.ID == ' + id ).join('||') + '}';
  return path( p, orgs );
};

const organizeOrgsByState = orgs => {
  return orgs.reduce( (states,org) => {
    const state  = org.fields.state[0];
    !states[state] && (states[state] = []);
    states[state].push( org );
    return states;
  }, {});
};

const organizeByOrgs = orgs => {
  return orgs.reduce( (orgObj,org) => (orgObj[org.ID] = org, orgObj), {} );
};

/*
  Return an object that has grouped the 'tags' param
  by what type of tag.
*/
const filterTagsByTypes = ({tags,filters}) => {
  const types = Object.keys(filters);
  const pred  = tags.map( t => `.name=="${t}"` ).join('||');
  const result = types.reduce( (result,type) => {
    result[type] = {
      tags: pred
              ? path(`."${type}".terms..{${pred}}.label`,filters)
              : [],
      label: filters[type].label
    };
    return result;
  }, {});
  return result;
};

module.exports = {
  trimOrgs,
  getVisibleStates,
  getVisibleOrgs,
  getSelectedOrgs,
  organizeOrgsByState,
  organizeByOrgs,
  planFromOrg,
  filterTagsByTypes,
};
