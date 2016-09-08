import React     from 'react';
import TagString from 'tag-string';

import OrgsList from './OrgsList.jsx';
import Filters  from './Filters.jsx';
import StateMap from './StateMap.jsx';

import { ContextMixin } from './ContextMixins';

import { setVisibility } from '../store/actions';

function getVisibleOrgs(orgs,filters) {

  var visible = {};
  
  for( var section in orgs ) {
    for( var state in orgs[section] ) {
      for( var i in orgs[section][state] ) {

        const org  = orgs[section][state][i];
        let   ok   = true;
        const tags = TagString.fromArray(org.tags);

        Object.keys(filters).forEach( f => {
          ok = ok && tags.contains(filters[f]);
        });

        if( ok ) {
          !visible[section] && (visible[section] = {});
          !visible[section][state] && (visible[section][state] = []);
          visible[section][state].push(org);
        }

      }
    }
  }
  
  return visible;
}

class CustomDonatePage extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = {
      selectedTerms: this.context.store.getState().groups.visibility    
    };
    this.onShowSection  = this.onShowSection.bind(this);
    this.onShowGroup    = this.onShowGroup.bind(this);
    this.onTermsChecked = this.onTermsChecked.bind(this);
  }

  stateFromStore(storeState) {
    const { 
      groups: {
        visibility
      }, 
      service: {
        orgs
      }
    } = storeState;

    this.setState( { 
      selectedTerms: visibility,
      orgs: getVisibleOrgs( orgs, visibility )
    });
  }

  onShowSection() {

  }

  onShowGroup() {

  }

  onTermsChecked(cat, terms, toggle) {
    const tags = TagString.fromArray( this.state.selectedTerms[cat] ).toggle(terms,toggle).toArray();
    this.context.store.dispatch( setVisibility( cat, tags ) );
  }

  render() {
    const {
      selectedTerms,
      orgs
    } = this.state;
    
    const fprops = {
      onShowGroup: this.onShowGroup,
      onShowSection: this.onShowSection,
      onTermsChecked: this.onTermsChecked,
      selected: selectedTerms
    };

    return (
      <div className="customDonateArea">
        <h1>Custom Donation Plan</h1>
        <StateMap />
        <Filters {...fprops} />
        <OrgsList orgs={orgs} />
      </div>
    );
  }
}

module.exports = CustomDonatePage;