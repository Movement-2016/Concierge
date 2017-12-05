import Home         from '../models/home';
import {
 GroupsModel, GroupsSlugModel
}  from '../models/groups';
import Contact      from '../models/contact';
import Team         from '../models/team';
import Jobs         from '../models/jobs';
import About        from '../models/about';
import Advisors     from '../models/advisors';
import Party        from '../models/party';
import {
  Plan,
  PlanSummary,
  Profile,
  Consult
}   from '../models/plan';

const mapper  = g => g.paths.map( p => ({
                                          path: p,
                                          routeModel: g,
                                          browserOnly: g.browserOnly || false
                                        }) );

const flatner = (accum, arrs) => [ ...accum, ...arrs ];

const RouteMap = [
  Home,
  GroupsModel,
  GroupsSlugModel,
  Contact,
  Team,
  Jobs,
  About,
  Advisors,
  Party,
  Plan,
  PlanSummary,
  Profile,
  Consult
].map( mapper ).reduce( flatner, [] );

module.exports = RouteMap;
