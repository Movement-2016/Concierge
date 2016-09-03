import React from 'react';
import Groups from './Groups.jsx';

class StateMap extends React.Component {

  constructor() {
    super(...arguments);
    this.state = { mapShowing: true };
  }

  componentDidMount() {
    /* globals $ */
    $('#map-collapser')
      .on('show.bs.collapse', () => this.setState( {mapShowing:true} ) )
      .on('hide.bs.collapse', () => this.setState( {mapShowing:false} ) );
  }

  componenWillUnmount() {
    $('#map-collapser')
      .off('show.bs.collapse')
      .off('hide.bs.collapse');
  }

  render() {
    const { mapShowing } = this.state;

    const btnText = mapShowing ? 'hide map' : 'show map';

    return (
        <div className="stateMapArea">
          <button className="btn" id="map-collapser" data-toggle="collapse" data-target="#state-map">{btnText}</button>
          <div className="collapse in" id="state-map">
            <img src="/images/photos/fake-map.png" />
          </div>
        </div>
      );
  }
}

class CustomDonatePage extends React.Component {

  render() {
    return (
      <div className="customDonateArea">
        <h1>Custom Donation Plan</h1>
        <StateMap />
        <Groups />
      </div>
    );
  }
}

module.exports = CustomDonatePage;