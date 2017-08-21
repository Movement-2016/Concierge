import React            from 'react';
import { connect }      from 'react-redux';
import Link             from '../../services/LinkToRoute';

const _SummaryLink =({
      email,
      phone
    }) => 
      <Link className="complete-button btn waves-effect waves-light" to={email && phone ? '/plan/summary' : '/plan/profile'}>
        {'Complete Plan'}
      </Link>;

const mapSummaryStateToProps = ({ profile: {email,phone} }) => ({ email, phone });

const SummaryLink = connect(mapSummaryStateToProps)(_SummaryLink);

module.exports = SummaryLink;
