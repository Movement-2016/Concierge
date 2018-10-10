import About from '../models/about';
import Advisors from '../models/advisors';
import Blog from '../models/blog';
import Contact from '../models/contact';
import ContactAdvisor from '../models/contactAdvisor';
import Contest from '../models/contest';
import DigitalToolkit from '../models/digitalToolkit';
import Faq from '../models/faq';
import Home from '../models/home';
import Jobs from '../models/jobs';
import OrganizersGuide from '../models/organizersGuide';
import Party from '../models/party';
import PartyToolkit from '../models/partyToolkit';
import PuertoRico from '../models/puertoRico';
import Team from '../models/team';
import { FundsModel, FundModel } from '../models/funds';
import { GroupsModel, GroupsSlugModel } from '../models/groups';
import { Plan, PlanSummary, Profile, Consult } from '../models/plan';

const mapper = g =>
  g.paths.map(p => ({
    path: p,
    routeModel: g,
    browserOnly: g.browserOnly || false,
  }));

const flattener = (accum, arrs) => [...accum, ...arrs];

const RouteMap = [
  About,
  Advisors,
  Blog,
  Consult,
  Contact,
  ContactAdvisor,
  Contest,
  DigitalToolkit,
  GroupsModel,
  Faq,
  FundModel,
  FundsModel,
  GroupsSlugModel,
  Home,
  Jobs,
  OrganizersGuide,
  Party,
  PartyToolkit,
  Plan,
  PlanSummary,
  Profile,
  PuertoRico,
  Team,
]
  .map(mapper)
  .reduce(flattener, []);

module.exports = RouteMap;
