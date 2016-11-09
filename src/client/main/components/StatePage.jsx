import React from 'react';
import { Link } from 'react-router';

import { Shell }          from './ContentPage.jsx';
import State              from './OrgList/State.jsx';
import { ServiceContext } from './ContextMixins';
import Loading            from './Loading.jsx';

class StatePage extends ServiceContext(React.Component) {

  stateFromStore(storeState) {
    storeState.service.orgs.then( orgs => {
      const allStates = storeState.service.groupings.terms;
      this.setState({ allStates, orgs, loading: false });
    });
    this.setState({ loading: true });
  }

  render() {

    const {
      allStates,
      orgs,
      loading
    } = this.state;

    if( loading ) {
      return <Loading />;
    }
    
    const name = this.props.params.name;

    const state  = allStates[name];
    const color  = state.group;

    return (
      <Shell name={'state-page ' + name} title={''}>
        <Link className="back-to-group-link" to="/groups/mobile"><i className="material-icons">chevron_left</i> Back to groups</Link>
        <State {...state} items={orgs[color][name]} />
      </Shell>
      );
  }

}

module.exports = StatePage;