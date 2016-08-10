import React from 'react';
import { Link } from 'react-router';
import GroupReport from './GroupReport.jsx';
import { saveProfile } from '../../account/store/actions';

export default class ReportPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    context.store.dispatch (saveProfile ());
    const store = context.store.getState ();
    this.state = {
      groups: store.groups,
      user: store.user,
    };
  }

  render () {
    let groups = [];
    let total = 0;
    for (let group of this.state.groups) {
      if (group.favorite) {
        let amount = '0';
        for (const donation of this.state.user.donations) {
          if (donation.group === group.id) {
            amount = donation.amount;
            total += parseInt (amount.replace (/,/g, ''), 10);
            break;
          }
        }
        if (amount !== '0') {
          groups.push (
            <GroupReport
              key={group.id}
              user={this.state.user}
              group={group}
              amount={amount}
            />
          );
        }
      }
    }
    if (groups.length === 0) {
      groups.push (<p key='none' className='r-none'>No planned giving entered yet.</p>);
    }

    let name = ((this.state.user.firstName === '') && (this.state.user.lastName === '')) ?
      '<Your name, from Planning page>' :
      `${this.state.user.firstName} ${this.state.user.lastName}`;
    let email = (this.state.user.email === '') ?
      '<Your email, from Planning page>' : this.state.user.email;
    let phone = (this.state.user.phone === '') ?
      '<Your phone number, from Planning page>' : this.state.user.phone;

    return (
      <div className='reportPage'>
        <button><Link to='/plan'>Back to Planning page</Link></button>
        <div className='reportArea'>
          <div>
            <p className='name'>{name}</p>
            <p className='email'>{email}</p>
            <p className='phone'>{phone}</p>
            <hr />
            {groups}
            <hr />
            <p className='total'>Total: $ {total.toString ().replace (/\B(?=(\d{3})+\b)/g, ',')}</p>
          </div>
        </div>
      </div>
    );
  }
}

ReportPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
