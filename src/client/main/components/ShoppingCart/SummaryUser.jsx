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
        <div className="user">
          <span className="fname">{fname}</span> <span className="lname">{lname}</span>
          <span className="email">{email}</span> <span className="phone">{phone}</span>
          <Link className="btn" to="/plan/profile">Edit Profile</Link>
        </div>
      );
  }
}

module.exports = SummaryUser;


