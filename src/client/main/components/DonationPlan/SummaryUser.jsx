import React     from 'react';
import Link      from '../../../ui/LinkToRoute';

class SummaryUser extends React.Component {

  render() {
    const { user } = this.props.store.getState();

    if( !user ) {
      return <span />;
    }

    const {
      fname,
      lname,
      phone,
      email
    } = user;

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
