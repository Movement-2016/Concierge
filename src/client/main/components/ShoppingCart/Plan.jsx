import React     from 'react';
import path      from 'jspath';

import { ContextMixin } from '../ContextMixins';

import { 
  getSelectedOrgs,
  organizeOrgs 
} from '../../store/utils';

class Org extends React.Component {

  constructor() {
    super(...arguments);
    const { filters, tags } = this.props;
    const pred = tags.map( t => `.name=="${t}"` ).join('||');
    this.tags = path(`."nonprofit-type".terms..{${pred}}.label`,filters);
  }

  render() {

    const {
      id,
      name
    } = this.props;    

    return(
      <div className="group-plan">
        <div className="giving-area">{'$'}<input type="text" id={`amount${id}`} defaultValue="0" /></div>
        <div className="name-plan" dangerouslySetInnerHTML={{__html:name}} />
        <div className="org-type-area">
          {this.tags.map( t => <span key={t}>{t} </span> )}
        </div>
      </div>
    );
  }
}

class StateOrgs extends React.Component {
  render() {
    
    const { 
      name, 
      orgs, 
      filters, 
      state 
    } = this.props;
    
    const { 
      label, 
      group 
    } = state;

    return (
        <div className="state-group-plan" id={name}>
          <h3 className={group}>{label}</h3>
          {orgs.map( org => <Org key={org.id} filters={filters} {...org} />)}
        </div>    
      );
  }
}

class Plan extends ContextMixin(React.Component) {

  stateFromStore(storeState) {

    const { 
      groups: {
        selected 
      },
      service: {
        orgs,
        filters,
        groupings: {
          terms:states
        }
      }
    } = storeState;

    this.setState({ states, filters, orgs: organizeOrgs(getSelectedOrgs(selected,orgs)) });
  }

  render() {
    const { orgs, filters, states } = this.state;

    return(
        <div className="plan-display-area">
          <div className="plan-groups-area">
          {Object.keys(orgs).map( state =>  <StateOrgs name={state} 
                                                       key={state} 
                                                       orgs={orgs[state]} 
                                                       filters={filters} 
                                                       state={states[state]}
                                            /> )} 
        </div>
      </div>
    );
  }
}

module.exports=Plan;

