import React     from 'react';
import TagString from 'tag-string';
import { browserHistory } from 'react-router';
import Sticky from 'react-stickynode';

import OrgList  from './OrgList';
import Filters  from './Filters';
import Tray     from './ShoppingCart/Tray.jsx';
import EasyDonateTiles    from './EasyDonateTiles.jsx';
import Loading  from './Loading.jsx';

import { ServiceContext } from './ContextMixins';

import { setVisibility } from '../store/actions';
import scrollToElement from '../../lib/scrollToElement';

import {
  getVisibleOrgs,
  getVisibleStates
} from '../store/utils';

class CustomDonatePage extends ServiceContext(React.Component) {

  constructor() {
    super(...arguments);
    this.onShowElement  = this.onShowElement.bind(this);
    this.onTermsChecked = this.onTermsChecked.bind(this);
  }

  componentDidMount() {
    const SHOW_ORGS_DELAY = 10;

    setTimeout( () => this.setState({ showOrgs: true }), SHOW_ORGS_DELAY);
  }

  get contextPropName() {
    return 'orgs';
  }

  onShowElement(element) {
    const {
      params:{ mobile = ''} = {}
    } = this.props;

    if( mobile ) {
      browserHistory.push( '/state/' + element );
    } else {
      browserHistory.push('/groups#' + element);
      const SCROLL_DELAY = 100;
      scrollToElement('#' + element, SCROLL_DELAY);
    }
  }

  onTermsChecked(cat, terms, toggle) {
    const selectedTerms = this.storeState.groups.visibility;
    const tags = terms && terms.length
                  ? TagString.fromArray( selectedTerms[cat] ).toggle(terms,toggle).toArray()
                  : [];
    this.context.store.dispatch( setVisibility( cat, tags ) );
  }

  render() {
    let {
      orgs,
      loading,
      showOrgs
    } = this.state;

    if( loading ) {
      return <Loading />;
    }

    const {
      groups: {
        visibility
      }
    } = this.storeState;

    orgs = getVisibleOrgs( orgs, visibility );

    const {
      params:{ mobile = ''} = {}
    } = this.props;

    const fprops = {
      onShowElement:   this.onShowElement,
      onTermsChecked:  this.onTermsChecked,
      selected:        visibility,
      visibleSections: Object.keys(orgs),
      visibleStates:   getVisibleStates(orgs),
      mobile
    };

    const title = 'Browse Groups';

    return (
      <main className={`browse-groups-page ${mobile}`}>
        <div className="container browse-groups-container">
          <h1 className="page-title">{title}</h1>
          {showOrgs || global.IS_SERVER_REQUEST
            ?
              <div className="browse-section">
                <div className="filter-area-wrapper">
                  <Sticky top={104} bottomBoundary=".browse-groups-container">
                    <Filters {...fprops} />
                  </Sticky>
                </div>
                <OrgList mobile={mobile} orgs={orgs} />

                <div className="plan-sidebar-wrapper">
                  <Sticky top={104} bottomBoundary=".browse-groups-container">
                    <div className="plan-sidebar">
                      <Tray />
                      <EasyDonateTiles />
                    </div>
                  </Sticky>
                </div>
              </div>
            : <Loading />
          }
        </div>
        <div className="bottom-spacer" />
      </main>
    );
  }
}

/*

*/
module.exports = CustomDonatePage;
