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
  Returns a list of states in a given color category.
*/
const statesInColor = (color, states) => path('.{.parent=='+color.term_id+'}', states);

/*
  Returns a list of color sections sorted in correct display order
*/
const colorSections = (colors, colorOrder) =>  {
  var orderMap = colorOrder.reduce( (accum, c, i) => {
    accum[c] = i;
    return accum;
  }, {} );
  return colors.sort( (a,b) => orderMap[a.slug] > orderMap[b.slug] );
};

/*
  Returns a structured array of groups with structure orgs[color][state][org]
*/
const orgs = (colors, states, groups, colorOrder) => {
  const orgs = {};
  const sortedColors = colorSections(colors, colorOrder);
  sortedColors.forEach( color => {
    orgs[color.slug] = {};
    statesInColor(color, states).forEach( state => {
      const foundOrgs =  path('.{.fields.state=="'+state.slug+'"}', groups);
      foundOrgs.length && (orgs[color.slug][state.slug] = foundOrgs);
    });
  });
  return orgs;
};

/*
  Returns a dictionary of color sections with count for number of groups within each color section
*/
const colorSectionsDict = (colorSections, states) => {
  return colorSections.reduce( (accum, c) => {
    accum[c.slug] = { ...c, count: numGroupsInColor(c, states) };
    return accum;
  }, {} );
}


/*
  Returns number of groups in the passed color category
*/
const numGroupsInColor = (color, states) => {
  const summer = (accum,s) => accum + s.count;
  return statesInColor(color, states).reduce( summer, 0 );
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
