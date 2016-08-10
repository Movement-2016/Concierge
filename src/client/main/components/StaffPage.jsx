import React from 'react';
import 'whatwg-fetch';

export default class StaffPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount () {
    fetch (`${location.origin}/api/data`, {
      method: 'get',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
    }).then (res => {
      if (!res.ok) {
        throw new Error (res.statusCode);
      } else {
        return res.json ();
      }
    }).then (data => {
      this.setState ({ error: null, data: JSON.parse (data) });
    }).catch (err => {
      this.setState ({ error: `Error statuscode: ${err}`, data: null });
    });
  }

  render () {
    const groups = this.context.store.getState ().groups;
    const groupTotal = {};
    let userFavoriteRows = [];
    let userRows = [];
    let groupRows = [];
    let key = 1;
    if (this.state.data) {
      for (const user of this.state.data) {
        for (const favorite of user.favorites) {
          let amount = 0;
          for (const donation of user.donations) {
            if (favorite === donation.group) {
              amount = donation.amount;
            }
          }
          userFavoriteRows.push (
            <tr key={key++}>
              <td className='s-user'>{`${user.firstName} ${user.lastName}`}</td>
              <td className='s-group'>{getGroupName (groups, favorite)}</td>
              <td className='s-amount'>{amount}</td>
            </tr>
          );
        }
      }
      for (const user of this.state.data) {
        for (const donation of user.donations) {
          userRows.push (
            <tr key={key++}>
              <td className='s-user'>{`${user.firstName} ${user.lastName}`}</td>
              <td className='s-group'>{getGroupName (groups, donation.group)}</td>
              <td className='s-amount'>{donation.amount}</td>
            </tr>
          );
          if (groupTotal[donation.group] === undefined) {
            groupTotal[donation.group] = 0;
          }
          groupTotal[donation.group] += parseInt (donation.amount.replace (/,/g, ''), 10);
        }
      }
      for (const group of Object.keys (groupTotal)) {
        groupRows.push (
          <tr key={key++}>
            <td className='s-group'>{getGroupName (groups, group)}</td>
            <td className='s-amount'>{groupTotal[group]}</td>
          </tr>
        );
      }
    }

    return (
      <div className='staffPage'>
        <h2>Staff Reports</h2>
        {this.state.error}
        <div className='staffArea'>
          <h2>User Donations Report</h2>
          <table>
            <thead>
              <tr>
                <th className='s-user-header'>Donor</th>
                <th className='s-group-header'>Group</th>
                <th className='s-amount-header'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {userRows}
            </tbody>
          </table>

          <h2>User Selected Groups Report</h2>
          <table>
            <thead>
              <tr>
                <th className='s-user-header'>Donor</th>
                <th className='s-group-header'>Group</th>
                <th className='s-amount-header'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {userFavoriteRows}
            </tbody>
          </table>

          <h2>Groups Report</h2>
          <table>
            <thead>
              <tr>
                <th className='s-group-header'>Group</th>
                <th className='s-amount-header'>Total</th>
              </tr>
            </thead>
            <tbody>
              {groupRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function getGroupName (groups, id) {
  for (const group of groups) {
    if (id === group.id) {
      return group.name;
    }
  }
  return '';
}

StaffPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
