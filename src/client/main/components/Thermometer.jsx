import React    from 'react';
import { Link } from 'react-router';

function commaize(value) {
  if( value === 0 || value === '0' ) {
      return '0';
  } else if( value ) {
      var regex = /([0-9]+)(([0-9]{3})($|,))/g;
      var str;
      var commaized = (value.string || value) + '';

      do {
          str = commaized;
          commaized = str.replace(regex,'$1,$2');
      } while( str !== commaized );

      return commaized;
  }
}

const ONE_HUNDRED = 100;

class Thermometer extends React.Component {

  constructor() {
    super(...arguments);
    const { goal, pledged } = this.props;
    
    this.percent = (pledged / goal) * ONE_HUNDRED;
  }

  render() {
    
    let { pledged, goal } = this.props;

    const mercuryStyle = {
      maxWidth:  this.percent + '%'
    };

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
                  <div className="mercury" style={mercuryStyle} />
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
