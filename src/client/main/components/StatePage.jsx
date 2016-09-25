import React from 'react';
import { Shell } from './ContentPage.jsx';
import State from './OrgList/State.jsx';
import { ServiceContext } from './ContextMixins';
import { Link } from 'react-router';

class StatePage extends ServiceContext(React.Component) {

  render() {
    const { params:{name} } = this.props;

    const {
      groupings: {
        terms:allStates
      },
      orgs
    } = this.state.service;

    const state  = allStates[name];
    const { 
      group:color
    } = state;

    return (
      <Shell name={name} title={''}>
        <Link to="/groups/mobile">Back to states</Link>
        <State {...state} items={orgs[color][name]} />
      </Shell>
      );
  }

}

module.exports = StatePage;