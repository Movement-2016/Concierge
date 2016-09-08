import React from 'react';

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

module.exports = StateMap;