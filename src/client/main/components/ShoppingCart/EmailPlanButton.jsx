import React     from 'react';
import 'whatwg-fetch';

const ADVISOR_EMAIL = 'advisor@movement2016.org';

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
    const { onError, onDone } = this.props;

    onDone(''); // clear error messages

    const sstate = this.context.store.getState();

    const {
      groups:{
        plan: items,
        planTotal        
      },
      user
    } = sstate;

    const payload = {
      ...user,
      advisorEmail: ADVISOR_EMAIL,
      items,
      planTotal
    };

    const opts = {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (payload),
    };

    fetch (`${location.origin}/api/plan/send`, opts)
      .then( resp => resp.json() )
      .then( resp => {
        // this is a gmail api thing
        if( resp.labelIds && resp.labelIds.includes('SENT') ) {
          onDone('Mail was sent!');  
        } else {
          onError('could not send mail, sorry about that');
        }      
      }).catch( () => onError('wups, something went wrong') );
  }


  render() {
    const { text, children } = this.props;
    return <button onClick={this.onEmail} className="btn btn-success">{text}{children}</button>;
  }
}

module.exports=EmailPlanButton;

