import React     from 'react';
import 'whatwg-fetch';

const ADVISOR_EMAIL = 'victor.stone@gmail.com';

class EmailPlanButton extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor() {
    super(...arguments);
    this.onEmail = this.onEmail.bind(this);
  }

  onEmail() {
    if( this.props.advisorMode ) {
      this.onRequestAdvisor();
    } else {
      this.onEmailMe();
    }
  }

  onEmailMe() {
    const { form, onError } = this.props;
    var addr = form['email'].value;
    if( !addr ) {
      return onError('Hey, you forgot to put in your email address.');
    }
    this._emailPlan(addr);
  }

  onRequestAdvisor() {
    const { form, onError } = this.props;
    const { 
      email:{value:email}, 
      phone:{value:phone} 
    } = form;

    if( !email && !phone ) {
      return onError( 'Hey, you should include either your email address or a phone number.' );
    }
    this._emailPlan(ADVISOR_EMAIL);
  }

  _emailPlan(addr) {

    const { onError, onDone } = this.props;

    const { 
      fname:{value:fname}, 
      lname:{value:lname}, 
      email:{value:email}, 
      phone:{value:phone} 
    } = this.props.form;
    
    const storeState = this.context.store.getState();

    const payload = {
      fname,
      lname,
      email,
      phone,
      addr,
      items: storeState.groups.plan
    };

    fetch (`${location.origin}/api/plan/send`, {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (payload),
    }).then ( resp => {
      if( resp && resp.labelIds && resp.labelIds.includes('SENT') ) {
        onDone('Mail was sent!');  
      } else {
        onError('could not send mail, sorr about that');
      }
      
    }).catch( () => onError('wups, something went wrong') );
  }


  render() {
    const { text, children } = this.props;
    return <button onClick={this.onEmail} className="btn btn-success">{text}{children}</button>;
  }
}

module.exports=EmailPlanButton;

