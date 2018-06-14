import React from 'react';
import { connect } from 'react-redux';
// import striptags from 'striptags';

import { Shell } from './ContentPage.jsx';

const TeamMember = ({ title, position, body, image }) => (
  <div className="team-member">
    <img className="team-image" src={image} />
    <div className="team-name">{title}</div>
    <div className="team-position">{position}</div>
    <div className="team-body">{body}</div>
  </div>
);

const _TeamPage = ({ teamMembers }) => (
  <Shell title="Meet Our Team" name="team-page">
    <div className="content">
      <div className="team-members">{teamMembers.map((t, i) => <TeamMember key={i} {...t} />)}</div>
    </div>
  </Shell>
);

const mapStoreToProps = ({
  router: {
    target: {
      model: { teamMembers },
    },
  },
}) => ({ teamMembers });

const TeamPage = connect(mapStoreToProps)(_TeamPage);

module.exports = TeamPage;
