/* globals $ */
import React    from 'react';

const ANIMATE_DELAY = 1500;
const ONE_HUNDRED = 100;
const ONE_MILLION = 1000000;

class Thermometer extends React.Component {

  constructor(props) {
    super(props);
    const {
      pledged,
      goal,
    } = this._getProps();
    this.percent = pledged / goal * ONE_HUNDRED;
  }

  componentDidMount() {
    setTimeout( () => $('.mercury').animate( {maxWidth:this.percent + '%'}, 'slow' ), ANIMATE_DELAY );
  }

  _getProps() {
    const {
      current,
      goal,
    } = this.props;
    return { pledged: parseInt(current), goal: parseInt(goal) };
  }

  render() {
    const {
      pledged,
      goal,
    } = this._getProps();
    const pledgedFormatted = '$' + (pledged / ONE_MILLION).toFixed(2) + ' million';
    const goalFormatted = '$' + (goal / ONE_MILLION).toFixed(0) + ' million';
    const groupNumber = this.props.groupNumber;

    return (
      <div className="thermometer-area">
        <div className="thermometer">
          <div className="mercury" />
        </div>
        <div className="thermometer-numbers">
          <div className="thermometer-current">
            <div className="amount">{pledgedFormatted}</div>
            <div className="label">donated to {groupNumber} groups</div>
          </div>
          <div className="thermometer-goal">
            <div className="amount">{goalFormatted}</div>
            <div className="label">total goal</div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Thermometer;
