import React    from 'react';
import { Link } from 'react-router';
import commaize from 'commaize';

const ONE_HUNDRED = 100;
const ANIMATE_DELAY = 1500;

class Thermometer extends React.Component {

  constructor() {
    super(...arguments);
    const { goal, pledged } = this.props;
    
    this.percent = (pledged / goal) * ONE_HUNDRED;
  }

  componentDidMount() {
    /* globals $ */
    setTimeout( () => $('.mercury').animate( {maxWidth:this.percent + '%'}, 'slow' ), ANIMATE_DELAY );
  }

  render() {
    
    let { pledged, goal } = this.props;

    goal    = '$' + commaize(goal);
    pledged = '$' + commaize(pledged);

    return (
        <div className="thermometerArea">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 hidden-sm hidden-xs">
                <div className="text text-center">Our goal is to distribute {goal} to over 220 groups</div>
              </div>
              <div className="col-md-1">
                <Link to="/donate" className="btn btn-sm btn-primary donate-button">donate</Link>
              </div>
              <div className="col-md-1 no-pad-right hidden-sm hidden-xs">
                <div className="thermometer-current">{pledged}</div>
              </div>
              <div className="col-md-5 no-pad-left no-pad-right" >
                <div className="thermometer hidden-sm hidden-xs">
                  <div className="mercury" />
                </div>
              </div>
              <div className="col-md-1 no-pad-left hidden-sm hidden-xs">
                <div className="thermometer-goal">{goal}</div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
module.exports = Thermometer;
