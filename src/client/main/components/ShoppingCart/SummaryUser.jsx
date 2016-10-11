import React     from 'react';
import { Link }  from 'react-router';

import { ContextMixin } from '../ContextMixins';

class SummaryUser extends ContextMixin(React.Component) {
  
  constructor() {
    super(...arguments);
    this.state = { 
      user: null
    };
  }

  stateFromStore(storeState) {
    const { user } = storeState;
    this.setState({ user });
  }

  render() {

    if( !this.state.user ) {
      return <span />;
    }

    const {      
      fname,
      lname,
      phone,
      email
    } = this.state.user;

    return (
        <div className="user-info">
          <div className="user-name">{fname} {lname}</div>
          <div className="user-email">{email}</div>
          <div className="user-phone">{phone}</div>
          <Link className="edit-user-info" to="/plan/profile">Edit Contact Info</Link>
        </div>
      );
  }
}

module.exports = SummaryUser;


