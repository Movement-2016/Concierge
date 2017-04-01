import React from 'react';

import {
  ContentPage,
  CustomDonatePage ,
  HouseParty       ,
  ContactPage      ,
  NotFoundPage     ,
  DonatePage       ,
  StatePage        ,
  AdvisorPage      ,
  SummaryPage      ,
  ConsultPage      ,
  ProfilePage      ,
} from '../client/main/components';

import ShoppingCart from '../client/main/components/ShoppingCart';

const MeetTheTeamPage  = () => <ContentPage page="team" />;
const AboutUsPage      = () => <ContentPage page="about" />;
const TestimonialsPage = () => <ContentPage page="testimonials" />;

const RouteMap = [
  {  path: '/donate',                component: DonatePage },
  {  path: '/groups(/:mobile)'     , component: CustomDonatePage },
  {  path: '/state/:name'          , component: StatePage }, 
  
  {  path: '/plan'          , component: ShoppingCart }, 
  {  path: '/plan/summary'  , component: SummaryPage }, 
  {  path: '/plan/profile'  , component: ProfilePage }, 
  {  path: '/plan/consult'  , component: ConsultPage }, 

  {  path: '/about'      , component: AboutUsPage }, 
  {  path: '/advisors'   , component: AdvisorPage }, 
  {  path: '/team'       , component: MeetTheTeamPage }, 
  {  path: '/getintouch' , component: ContactPage }, 
  {  path: '/houseparty' , component: HouseParty }, 

  {  path: '/testimonials' , component: TestimonialsPage }, 

  {  path: '*' ,             component: NotFoundPage }, 
];

module.exports = RouteMap;
