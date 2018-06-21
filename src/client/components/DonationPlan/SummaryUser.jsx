import React from 'react';
import { connect } from 'react-redux';
import Link from '../../services/LinkToRoute';

function propsAreSet(obj) {
  for (var prop in obj) {
    if (obj[prop]) {
      return true;
    }
  }
  return false;
}

class _SummaryUser extends React.Component {
  render() {
    const { user } = this.props;

    if (!propsAreSet(user)) {
      return <span />;
    }

    const { fname, lname, phone, email } = user;

    return (
      <div className="user-info">
        <div className="user-name">
          {fname} {lname}
        </div>
        <div className="user-email">{email}</div>
        <div className="user-phone">{phone}</div>
        <Link className="edit-user-info" to="/plan/profile">
          {'Edit Contact Info'}
        </Link>
      </div>
    );
  }
}

const mapStateToProps = s => ({ user: s.user });

const SummaryUser = connect(mapStateToProps)(_SummaryUser);

module.exports = SummaryUser;
