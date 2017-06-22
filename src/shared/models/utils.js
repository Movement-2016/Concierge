import path from 'jspath';

/* 
  remove 'state' from taxonomies 
*/
const groupFilters = tax => {
  return Object.keys( tax )
    .filter( k => k !== 'state')
    .reduce( (accum,k) => { accum[k] = { ...tax[k], tags: Object.keys(tax[k].terms) }; return accum; }, {} );
};

const STATES_QUERY = '.taxonomies.state.terms';
const GROUPS_QUERY = '.posts.group';

/* 
  Returns a list of states when passed a color category object.
  If no color category is passed, returns an unsorted list of color categories. 
*/
const statesInColor = (color, states) => {
  var id = (color && color.term_id) || 0;
  return path('.*{.parent=='+id+'}',states);
};

/* 
  Returns a list of state color categories sorted in correct display order 
*/
const colorSections = (states,colorOrder) =>  {
  var colors   = statesInColor(0,states);
  var orderMap = colorOrder.reduce( (accum,c,i) => { accum[c] = i; return accum; }, {} );
  return colors.sort( (a,b) => orderMap[a.slug] > orderMap[b.slug] );
};

/* 
  Returns a structured array of groups with structure orgs[color][state][org] 
*/
const orgs = (states, groups, colorOrder) => {

  const orgs = {};
  const colors = colorSections(states,colorOrder);
  colors.forEach( color => {
    orgs[color.slug] = {};
    statesInColor(color,states).forEach( state => {
      const foundOrgs =  path('.{.fields.state=="'+state.slug+'"}', groups);
      foundOrgs.length && (orgs[color.slug][state.slug] = foundOrgs);
    });
  });
  return orgs;
};

/*
  Returns a dictionary of color sections 
*/
const colorSectionsDict = (states,colorOrder) => {
  return colorSections(states,colorOrder).reduce( (accum,c) => {
    accum[c.slug] = { ...c, count: numGroupsInColor(c,states) };
    return accum;
  }, {} );
};

/*
  Returns number of groups in the passed color category 
*/
const numGroupsInColor = (color,states) => {
  const summer = (accum,s) => accum + s.count;
  return statesInColor(color,states).reduce( summer, 0 );
};

module.exports = {
  STATES_QUERY,
  GROUPS_QUERY,

  groupFilters,
  statesInColor,
  colorSections,
  orgs,
  colorSectionsDict
};