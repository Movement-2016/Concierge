import React    from 'react';
import { Link } from 'react-router';

const ANIMATE_DELAY = 1500;

class Thermometer extends React.Component {

  constructor(props) {
    super(props);
    const {
      pledged,
      goal,
    } = this.props;
    this.percent = (pledged / goal) * 100;
  }

  componentDidMount() {
    setTimeout( () => $('.mercury').animate( {maxWidth:this.percent + '%'}, 'slow' ), ANIMATE_DELAY );
  }

  render() {
    const pledgedFormatted = '$' + (this.props.pledged / 1000000).toFixed(2) + ' million';
    const goalFormatted = '$' + (this.props.goal / 1000000).toFixed(0) + ' million';

    return (
      <div className="thermometer-area">
        <div className="thermometer">
          <div className="mercury" />
        </div>
        <div className="thermometer-numbers">
          <div className="thermometer-current">{pledgedFormatted + ' raised'}</div>
          <div className="thermometer-goal">{goalFormatted + ' goal'}</div>
        </div>
      </div>
    );
  }
}

module.exports = Thermometer;
