import HomePage   from './models/home';
import GroupsPage from './models/groups';

// import React from 'react';

// import {
//   ContentPage,
//   HouseParty,
//   ContactPage,
  // NotFoundPage,
//   AdvisorPage,
//   ConsultPage,
// } from '../client/main/components';

// import {
//   PlanPage,
//   ProfilePage,
//   SummaryPage
// } from '../client/main/components/DonationPlan';


// const contentPage = pageName => {
//   const pageWrapper = props => <ContentPage page={props.page} pageName={pageName} />;
//   pageWrapper.preloadPage = pageName;
//   return pageWrapper;
// };

// const MeetTheTeamPage  = contentPage('team');
// const AboutUsPage      = contentPage('about');

const mapper  = g => g.paths.map( p => {return { path: p, component: g, browserOnly: g.browserOnly || false }; } ); 
const flatner = (accum, arrs) => [ ...accum, ...arrs ];

const RouteMap = [ 
  HomePage, 
  GroupsPage 
].map( mapper ).reduce( flatner, [] );

// const RouteMap = [
//   {  path: '/',                     component: HomePage },

  // {  path: '/groups(/:slug)',       component: OrgsEntryPage },

  // {  path: '/plan',                 component: PlanPage, browserOnly },
  // {  path: '/plan/summary',         component: SummaryPage,  browserOnly },
  // {  path: '/plan/profile',         component: ProfilePage,  browserOnly },
  // {  path: '/plan/consult',         component: ConsultPage,  browserOnly },

  // {  path: '/about',                component: AboutUsPage },
  // {  path: '/advisors',             component: AdvisorPage },
  // {  path: '/team',                 component: MeetTheTeamPage },

  // {  path: '/getintouch',           component: ContactPage, browserOnly },
  // {  path: '/houseparty',           component: HouseParty, browserOnly },

//   {  path: '*' ,             component: NotFoundPage, browserOnly },
// ];

// console.log( 'RouteMap: ', RouteMap );

module.exports = RouteMap;
