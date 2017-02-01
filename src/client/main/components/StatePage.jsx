import React from 'react';
import { Link } from 'react-router';

import { Shell }          from './ContentPage.jsx';
import State              from './OrgList/State.jsx';
import { ServiceContext } from './ContextMixins';
import Loading            from './Loading.jsx';

class StatePage extends ServiceContext(React.Component) {

  stateFromStore(storeState) {
    storeState.service.orgs.then( orgs => {
      const {
        groupDict: allStates,
        groupSectionsIDDict: colors,
        filtersSync: filters
      } = storeState.service;

      this.setState({ allStates, filters, colors, orgs, loading: false });
    });
    this.setState({ loading: true });
  }

  render() {

    const {
      allStates,
      orgs,
      colors,
      loading,
      filters
    } = this.state;

    if( loading ) {
      return <Loading />;
    }
    
    const name = this.props.params.name;

    const state  = allStates[name];
    const color  = colors[state.parent].slug;

    return (
      <Shell name={'state-page ' + name} title={''}>
        <Link className="back-to-group-link" to="/groups/mobile"><i className="material-icons">chevron_left</i> Back to groups</Link>
        <State {...state} 
              items={orgs[color][name]} 
              store={this.context.store} 
              filters={filters}
              selected={[]}
        />
      </Shell>
      );
  }

}

module.exports = StatePage;