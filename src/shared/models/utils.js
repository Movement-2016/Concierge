import path from 'jspath';

/* 
  remove 'state' from taxonomies 
*/
const groupFilters = tax => {
  return Object.keys( tax )
    .filter( k => k !== 'state')
    .reduce( (accum,k) => (accum[k] = { ...tax[k], tags: Object.keys(tax[k].terms) },accum), {} );
};

const STATES_AND_COLORS_QUERY = '.taxonomies.state.terms';
const STATES_QUERY            = '.taxonomies.state.terms.*{.parent!=0}';
const COLORS_QUERY            = '.taxonomies.state.terms.*{.parent==0}';

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
const colorSections = (statesAndColors,colorOrder) =>  {
  var colors   = statesInColor(0,statesAndColors);
  var orderMap = colorOrder.reduce( (accum,c,i) => (accum[c] = i,accum), {} );
  return colors.sort( (a,b) => orderMap[a.slug] > orderMap[b.slug] );
};

/* 
  Returns a structured array of groups with structure orgs[color][state][org] 
*/
const orgs = (statesAndColors, groups, colorOrder) => {

  const orgs = {};
  const colors = colorSections(statesAndColors,colorOrder);
  colors.forEach( color => {
    orgs[color.slug] = {};
    statesInColor(color,statesAndColors).forEach( state => {
      const foundOrgs =  path('.{.fields.state=="'+state.slug+'"}', groups);
      foundOrgs.length && (orgs[color.slug][state.slug] = foundOrgs);
    });
  });
  return orgs;
};

/*
  Returns a dictionary of color sections 
*/
const colorSectionsDict = (statesAndColors,colorOrder) => {
  return colorSections(statesAndColors,colorOrder)
            .reduce( (accum,c) => (accum[c.slug] = { ...c, count: numGroupsInColor(c,statesAndColors) }, accum) );
};

/*
  Returns number of groups in the passed color category 
*/
const numGroupsInColor = (color,statesAndColors) => {
  const summer = (accum,s) => accum + s.count;
  return statesInColor(color,statesAndColors).reduce( summer, 0 );
};

module.exports = {
  STATES_AND_COLORS_QUERY,
  STATES_QUERY,
  COLORS_QUERY,

  groupFilters,
  statesInColor,
  colorSections,
  orgs,
  colorSectionsDict
};