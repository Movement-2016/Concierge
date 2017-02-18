import React     from 'react';
import TagString from 'tag-string';
import { browserHistory } from 'react-router';

import OrgList  from './OrgList';
import Filters  from './Filters';
import Tray     from './ShoppingCart/Tray.jsx';
import EasyDonateTiles    from './EasyDonateTiles.jsx';
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
    const storeState = this.context.store.getState();
    this.state = {
      selectedTerms: storeState.groups.visibility,
      loading: true,
      showOrgs: false
    };
    this.onShowState    = this.onShowState.bind(this);
    this.onTermsChecked = this.onTermsChecked.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ showOrgs: true }), 300);
  }

  stateFromStore(storeState) {
    storeState.service.orgs.then( orgs => {
      const {
        groups: {
          visibility
        }
      } = storeState;

      this.setState( {
        selectedTerms: visibility,
        orgs: getVisibleOrgs( orgs, visibility ),
        loading: false
      });
    });
  }

  onShowState(state) {
    const {
      params:{ mobile = ''} = {}
    } = this.props;

    if( mobile ) {
      browserHistory.push( '/state/' + state );
    } else {
      browserHistory.push('/groups#' + state);
      scrollToElement('#' + state,100);
    }
  }

  onTermsChecked(cat, terms, toggle) {
    const tags = terms && terms.length
                  ? TagString.fromArray( this.state.selectedTerms[cat] ).toggle(terms,toggle).toArray()
                  : [];
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
      params:{ mobile = ''} = {}
    } = this.props;

    const fprops = {
      onShowState:     this.onShowState,
      onShowSection:   this.onShowState,
      onTermsChecked:  this.onTermsChecked,
      selected:        selectedTerms,
      visibleSections: Object.keys(orgs),
      visibleStates:   getVisibleStates(orgs),
      mobile
    };

    const title = 'Browse Groups';

    return (
      <main className={`browse-groups-page ${mobile}`}>
        <div className="container">
          <h1 className="page-title">{title}</h1>
          {showOrgs
            ?
              <div className="browse-section">
                <div className="filter-area">
                  <Filters {...fprops} />
                </div>
                <OrgList mobile={mobile} orgs={orgs} />

                <div className="plan-sidebar">
                  <Tray />
                  <EasyDonateTiles />
                </div>
              </div>
            : <Loading />
          }
        </div>
      </main>
    );
  }
}

/*

*/
module.exports = CustomDonatePage;
