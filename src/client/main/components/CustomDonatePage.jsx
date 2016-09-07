import React from 'react';

import OrgsList from './OrgsList.jsx';
import Filters  from './Filters.jsx';

class StateMap extends React.Component {

  constructor() {
    super(...arguments);
    this.state = { mapShowing: true };
  }

  componentDidMount() {
    /* globals $ */
    $('#state-map')
      .on('show.bs.collapse', () => this.setState( {mapShowing:true} ) )
      .on('hide.bs.collapse', () => this.setState( {mapShowing:false} ) );
  }

  componenWillUnmount() {
    $('#state-map')
      .off('show.bs.collapse')
      .off('hide.bs.collapse');
  }

  render() {
    const { mapShowing } = this.state;

    const btnText = mapShowing ? 'hide map' : 'show map';

    return (
        <div className="stateMapArea">
          <div className="collapse in" id="state-map">
            <img src="/images/photos/fake-map.png" />
          </div>
          <a className="hide-map" data-toggle="collapse" data-target="#state-map" href="#">{btnText}</a>
        </div>
      );
  }
}

class CustomDonatePage extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      selectedTerms: []      
    };
    this.onShowSection  = this.onShowSection.bind(this);
    this.onShowGroup    = this.onShowGroup.bind(this);
    this.onTermsChecked = this.onTermsChecked.bind(this);
  }

  onShowSection() {

  }

  onShowGroup() {

  }

  onTermsChecked() {

  }

  render() {
    const fprops = {
      onShowGroup: this.onShowGroup,
      onShowSection: this.onShowSection,
      onTermsChecked: this.onTermsChecked,
      selected: this.state.selectedTerms
    };

    return (
      <div className="customDonateArea">
        <h1>Custom Donation Plan</h1>
        <StateMap />
        <Filters {...fprops} />
        <OrgsList />
      </div>
    );
  }
}

module.exports = CustomDonatePage;