import Home     from '../models/home';
import Groups   from '../models/groups';
import Contact  from '../models/contact';
import Team     from '../models/team';
import About    from '../models/about';
import Advisors from '../models/advisors';
import Party    from '../models/party';
import {
  Plan,
  PlanSummary,
  Profile,
  Consult
} from '../models/plan';

const mapper  = g => g.paths.map( p => {return { path: p, component: g, browserOnly: g.browserOnly || false }; } ); 
const flatner = (accum, arrs) => [ ...accum, ...arrs ];

const RouteMap = [ 
  Home, 
  Groups,
  Contact,
  Team,
  About,
  Advisors,
  Party,
  Plan,
  PlanSummary,
  Profile,
  Consult  
].map( mapper ).reduce( flatner, [] );

module.exports = RouteMap;
