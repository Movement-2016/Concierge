import Home from '../models/home';
import { GroupsModel, GroupsSlugModel } from '../models/groups';
import { FundsModel, FundModel } from '../models/funds';
import Contact from '../models/contact';
import ContactAdvisor from '../models/contactAdvisor';
import Team from '../models/team';
import Jobs from '../models/jobs';
import OrganizersGuide from '../models/organizersGuide';
import DigitalToolkit from '../models/digitalToolkit';
import About from '../models/about';
import Advisors from '../models/advisors';
import Party from '../models/party';
import { Plan, PlanSummary, Profile, Consult } from '../models/plan';

const mapper = g =>
  g.paths.map(p => ({
    path: p,
    routeModel: g,
    browserOnly: g.browserOnly || false,
  }));

const flattener = (accum, arrs) => [...accum, ...arrs];

const RouteMap = [
  Home,
  GroupsModel,
  GroupsSlugModel,
  Contact,
  ContactAdvisor,
  Team,
  Jobs,
  OrganizersGuide,
  DigitalToolkit,
  About,
  Advisors,
  FundsModel,
  FundModel,
  Party,
  Plan,
  PlanSummary,
  Profile,
  Consult,
]
  .map(mapper)
  .reduce(flattener, []);

module.exports = RouteMap;
