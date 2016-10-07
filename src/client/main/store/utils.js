import path from 'jspath';

import 'whatwg-fetch';
const ADVISOR_EMAIL = 'advisor@movement2016.org';


const emailPlan = ({ storeState, onError, onDone, forceConsult = false }) => {
    
    onDone(''); // clear error messages
    onError('');

    const sstate = storeState;

    let {
      groups:{
        plan: items,
        planTotal        
      },
      user
    } = sstate;

    forceConsult && (user = { ...user, wantsConsult: true });
    
    const payload = {
      ...user,
      advisorEmail: ADVISOR_EMAIL,
      items,
      planTotal
    };

    const opts = {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (payload),
    };

    fetch (`${location.origin}/api/plan/send`, opts)
      .then( resp => resp.json() )
      .then( resp => {
        // this is a gmail api thing
        if( resp.labelIds && resp.labelIds.includes('SENT') ) {
          onDone('Mail was sent!');  
        } else {
          onError('could not send mail, sorry about that');
        }      
      }).catch( () => onError('wups, something went wrong') );

};

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

  var tags = Object.keys(filters).map( k => filters[k] ); 
  
  return _iterateOrgs( orgs, org => {
    for( var n = 0; n < tags.length; n++ ) {
      if( !fastArrCmp(org.tags,tags[n]) ) {
        return false;
      }
    }
    return true;
  });

};

const getVisibleStates = orgs => {
  return path('..state',orgs).reduce( (a,e) => { a.indexOf(e) < 0 && a.push(e); return a; }, [] ).sort();
};

const planFromOrg = (plan,id) => path( `..{.id==${id}}`,plan )[0];


const getSelectedOrgs = (ids =[],orgs) => {
  if( !ids.length ) { return []; }
  var p = '..{' + ids.map( id => '.id == ' + id ).join('||') + '}';
  return path( p, orgs );
};

const organizeOrgsByState = orgs => {
  return orgs.reduce( (states,org) => {
    const { state } = org;
    !states[state] && (states[state] = []);
    states[state].push( org );
    return states;
  }, {});
};

const organizeByOrgs = orgs => {
  return orgs.reduce( (orgObj,org) => (orgObj[org.id] = org, orgObj), {} );
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
      tags: path(`."${type}".terms..{${pred}}.label`,filters),
      label: filters[type].label
    };
    return result;
  }, {});
  return result;
};

module.exports = {
  getVisibleStates,
  getVisibleOrgs,
  getSelectedOrgs,
  organizeOrgsByState,
  organizeByOrgs,
  planFromOrg,
  filterTagsByTypes,
  emailPlan
};