import React    from 'react';
import { Link } from 'react-router';
import commaize from 'commaize';

const ONE_HUNDRED = 100;
const ANIMATE_DELAY = 1500;

let nextID = 0;

class Thermometer extends React.Component {

  constructor() {
    super(...arguments);
    const { goal, pledged } = this.props;

    this.id = '_merc_' + (++nextID);

    this.percent = (pledged / goal) * ONE_HUNDRED;
  }

  componentDidMount() {
    /* globals $ */
    setTimeout( () => $('#' + this.id).animate( {maxWidth:this.percent + '%'}, 'slow' ), ANIMATE_DELAY );
  }

  render() {
    return(
        <div className="thermometer">
          <div id={this.id} className="mercury" />
        </div>
    );
  }
}

class DonateHeader extends React.Component {

  render() {
    
    let { pledged, goal } = this.props;

    goal    = '$' + commaize(goal);
    pledged = '$' + commaize(pledged);

    return (
      <section className="donate-header">
        <div className="wrapper">
          <div className="description">Our goal is to distribute {goal} to over 220 groups</div>
          <Link to="/donate" className="donate-button btn-flat waves-effect waves-light">Donate</Link>
          <div className="thermometer-area">
            <div className="thermometer-current">{pledged}</div>
            <Thermometer {...this.props} />
            <div className="thermometer-goal">{goal}</div>
          </div>
        </div>
      </section>
    );
  }
}

DonateHeader.Thermometer = Thermometer;

module.exports = DonateHeader;
