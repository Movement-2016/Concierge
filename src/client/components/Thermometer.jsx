/* global $ */

import React from 'react';

const ONE_MILLION = 1000000;

class Thermometer extends React.Component {
  componentDidMount() {
    $('.mercury').addClass('loaded');
  }

  render() {
    const current = parseInt(this.props.current);
    const goal = parseInt(this.props.goal);
    const percent = (current / goal) * 100;

    const mercuryStyle = { maxWidth: percent + '%' };
    const currentFormatted = Math.round((current / ONE_MILLION) * 100) / 100; // round to 2 decimal places
    const goalFormatted = Math.round(goal / ONE_MILLION);

    return (
      <div className="thermometer-area">
        <div className="thermometer-current">
          {'$' + currentFormatted + ' million donated to ' + this.props.groupNumber + ' groups'}
        </div>
        <div className="thermometer">
          <div className="mercury" style={mercuryStyle} />
        </div>
        <div className="thermometer-goal">{'$' + goalFormatted + ' million total goal'}</div>
      </div>
    );
  }
}

module.exports = Thermometer;
