import React     from 'react';
import TagString from 'tag-string';

import OrgList  from './OrgList';
import Filters  from './Filters';
import StateMap from './StateMap.jsx';
import Tray     from './ShoppingCart/Tray.jsx';

import { ContextMixin } from './ContextMixins';

import { setVisibility } from '../store/actions';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../store/utils';

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
      onShowGroup:     this.onShowGroup,
      onShowSection:   this.onShowSection,
      onTermsChecked:  this.onTermsChecked,
      selected:        selectedTerms,
      visibleSections: Object.keys(orgs),
      visibleGroups:   getVisibleStates(orgs)
    };

    /* put a '-' in front of pinned b/c I couldn't see below it
       on a MBP */
       
    return (
      <div className="custom-donate-area">
        <h1>Custom Donation Plan</h1>
        <div className="group-area">
          <div className="row">
            <div className="group-col col s12 m9">
              <OrgList orgs={orgs} />
            </div>
            <div className="col s12 m3">
              <div className="filter-col -pinned" style={{top:0}} >
                <Filters {...fprops} />
              </div>
            </div>
          </div>
        </div>
        <Tray />
      </div>
    );
  }
}

module.exports = CustomDonatePage;