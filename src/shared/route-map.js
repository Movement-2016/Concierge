import React from 'react';

import {
  ContentPage,
  HousePartyPage,
  ContactPage,
  NotFoundPage,
  AdvisorPage,
  ConsultPage,
} from '../client/main/components';

import {
  PlanPage,
  ProfilePage,
  SummaryPage
} from '../client/main/components/DonationPlan';

import {
  OrgsEntryPage,
  OrgsPageMobile
} from '../client/main/components/Orgs';

const contentPage = pageName => {
  const pageWrapper = props => <ContentPage page={props.page} pageName={pageName} />;
  pageWrapper.preloadPage = pageName;
  return pageWrapper;
};

const MeetTheTeamPage  = contentPage('team');
const AboutUsPage      = contentPage('about');
const TestimonialsPage = contentPage('testimonials');

var browserOnly = true;

const RouteMap = [
  {  path: '/groups(/:slug)',       component: OrgsEntryPage },

  {  path: '/plan',                 component: PlanPage, browserOnly },
  {  path: '/plan/summary',         component: SummaryPage,  browserOnly },
  {  path: '/plan/profile',         component: ProfilePage,  browserOnly },
  {  path: '/plan/consult',         component: ConsultPage,  browserOnly },

  {  path: '/about',                component: AboutUsPage },
  {  path: '/advisors',             component: AdvisorPage },
  {  path: '/team',                 component: MeetTheTeamPage },

  {  path: '/getintouch',           component: ContactPage, browserOnly },
  {  path: '/houseparty',           component: HousePartyPage },

  {  path: '*' ,                    component: NotFoundPage, browserOnly },
];

module.exports = RouteMap;
