import React     from 'react';
import 'whatwg-fetch';

import Alert from '../../../ui/Alert.jsx';

const ADVISOR_EMAIL = 'victor.stone@gmail.com';

class PlanForm extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      error: null,
      msg: null
    };
    this.onEmailMe = this.onEmailMe.bind(this);
    this.onRequestAdvisor = this.onRequestAdvisor.bind(this);
  }

  onEmailMe() {
    var addr = this.refs['email'].value;
    if( !addr ) {
      this.setState( { error: 'Hey, you forgot to put in your email address.'});
      return;
    }
    this._emailPlan();
  }

  onRequestAdvisor() {
    const { 
      email:{value:email}, 
      phone:{value:phone} 
    } = this.refs;

    if( !email && !phone ) {
      this.setState( { error: 'Hey, you should include either your email address or a phone number.'});
      return;
    }
    this._emailPlan(ADVISOR_EMAIL);
  }

  _emailPlan(addr) {
    const { 
      fname:{value:fname}, 
      lname:{value:lname}, 
      email:{value:email}, 
      phone:{value:phone} 
    } = this.refs;
    
    const payload = {
      fname,
      lname,
      email,
      phone,
      addr,
      items: this.props.planData
    };

    fetch (`${location.origin}/api/plan/send`, {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (payload),
    }).then ( () => this.setState({ error: '', msg: 'Mail was sent!' }) )
    .catch( () => this.setState({ error: 'wups, something went wrong' }));
  }


  render() {
    const { error, msg } = this.state;

    return (
        <div className="plan-form">
          <h2> Plan Your Contributions </h2>
          <p>Use this worksheet to help plan how to most effectively make your donations to grassroots movement groups.</p> 
          <Alert msg={error || msg} type={error ? Alert.DANGER : Alert.SUCCESS} />
          <div className="info-area">
            <h3>Your Information</h3> 
            <input ref="fname" type="text" placeholder="First Name" defaultValue="" /> 
            <input ref="lname" type="text" placeholder="Last Name" defaultValue="" /> 
            <input ref="email" type="text" placeholder="Email" defaultValue="" /> 
            <input ref="phone" type="text" placeholder="Phone" defaultValue="" />
            <div className="action-area"> 
              <button onClick={this.onEmailMe} className="btn btn-success">Email me this plan</button>{' or '}
              <button onClick={this.onRequestAdvisor} className="btn btn-success">Request consultation</button>
            </div>
          </div>
        </div>
      );
  }
}

module.exports=PlanForm;

