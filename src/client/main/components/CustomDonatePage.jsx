import React     from 'react';
import TagString from 'tag-string';
import { browserHistory } from 'react-router';

import OrgList  from './OrgList';
import Filters  from './Filters';
import Tray     from './ShoppingCart/Tray.jsx';
import Loading  from './Loading.jsx';

import { ContextMixin } from './ContextMixins';

import { setVisibility } from '../store/actions';
import scrollToElement from '../../lib/scrollToElement';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../store/utils';

class CustomDonatePage extends ContextMixin(React.Component) {

  constructor() {
    super(...arguments);
    this.state = {
      selectedTerms: this.context.store.getState().groups.visibility,
      loading: true,
      showOrgs: false
    };
    this.onShowGroup    = this.onShowGroup.bind(this);
    this.onTermsChecked = this.onTermsChecked.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ showOrgs: true }), 300);
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
      orgs: getVisibleOrgs( orgs, visibility ),
      loading: false
    });
  }

  onShowGroup(state) {
    browserHistory.push('/groups#' + state);
    scrollToElement('#' + state);
  }

  onTermsChecked(cat, terms, toggle) {
    const tags = TagString.fromArray( this.state.selectedTerms[cat] ).toggle(terms,toggle).toArray();
    this.context.store.dispatch( setVisibility( cat, tags ) );
  }

  render() {
    const {
      selectedTerms,
      orgs,
      loading,
      showOrgs
    } = this.state;
    
    if( loading ) {
      return <Loading />;
    }

    const { 
      params = {}
    } = this.props;

    const fprops = {
      onShowGroup:     this.onShowGroup,
      onShowSection:   this.onShowGroup,
      onTermsChecked:  this.onTermsChecked,
      selected:        selectedTerms,
      visibleSections: Object.keys(orgs),
      visibleGroups:   getVisibleStates(orgs)
    };

    return (
      <div className="custom-donate-area">
        <h1>Custom Donation Plan</h1>
        <div className="group-area">
          <div className="row">
            <div className="group-col col s12 m9">
              {showOrgs 
                ? <OrgList {...params} orgs={orgs} />
                : <Loading />
              }
            </div>
            <div className="col s12 m3 hidden-on-small-and-down">
              <div className="filter-col pinned" >
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