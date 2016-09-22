import React    from 'react';
import { Link } from 'react-router';
import commaize from 'commaize';

const ONE_HUNDRED = 100;
const ANIMATE_DELAY = 1500;

let nextID = 0;

class Mercury extends React.Component {

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

class Thermometer extends React.Component {

  render() {
    
    let { pledged, goal } = this.props;

    goal    = '$' + commaize(goal);
    pledged = '$' + commaize(pledged);

    return (
        <div className="thermometerArea">
          <div className="container-fluid">
            <div className="row">
              <div className="col s4 hide-on-small-only">
                <div className="text center">Our goal is to distribute {goal} to over 220 groups</div>
              </div>
              <div className="col s1">
                <Link to="/donate" className="btn btn-sm btn-primary donate-button">donate</Link>
              </div>
              <div className="col s1 hide-on-med-and-down">
                <div className="thermometer-current">{pledged}</div>
              </div>
              <div className="col s5 no-pad-left no-pad-right hide-on-small-only" >
                <Mercury {...this.props} />
              </div>
              <div className="col s1 no-pad-left hide-on-med-and-down">
                <div className="thermometer-goal">{goal}</div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Thermometer.Mercury = Mercury;

module.exports = Thermometer;
