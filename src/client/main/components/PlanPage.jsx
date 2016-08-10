import React from 'react';
import StateGroupPlan from './StateGroupPlan.jsx';
import { setUserFirstName, setUserLastName, setUserEmail, setUserPhone,
  updatePlanned, updateGiven } from '../../account/store/actions';

export default class PlanPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    const store = context.store.getState ();
    const groups = [];
    for (const group of store.groups) {
      if (group.favorite) {
        groups.push (group);
      }
    }
    this.state = {
      groups,
      firstName: store.user.firstName,
      lastName: store.user.lastName,
      email: store.user.email,
      phone: store.user.phone,
      donations: store.user.donations,
      refs: {},
    };

    this.onPlannedChanged = this.onPlannedChanged.bind (this);
    this.onGivenChanged = this.onGivenChanged.bind (this);
    this.onRegisterRef = this.onRegisterRef.bind (this);
    this.onNextField = this.onNextField.bind (this);
    this.onPreviousField = this.onPreviousField.bind (this);
  }

  componentWillMount () {
    this.unsubscribe = this.context.store.subscribe (() => {
      const store = this.context.store.getState ();
      const groups = [];
      for (const group of store.groups) {
        if (group.favorite) {
          groups.push (group);
        }
      }
      this.setState ({
        groups,
        firstName: store.user.firstName,
        lastName: store.user.lastName,
        email: store.user.email,
        phone: store.user.phone,
        donations: store.user.donations,
      });
    });
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  onPlannedChanged (id, value) {
    this.context.store.dispatch (updatePlanned (id, value));
  }

  onGivenChanged (id, value) {
    this.context.store.dispatch (updateGiven (id, value));
  }

  onRegisterRef (id, ref) {
    this.state.refs[id] = ref;
  }

  onNextField (id) {
    let index = 0;
    for (const group of this.state.groups) {
      if (group.id === id) {
        break;
      }
      index++;
    }
    if (index < this.state.groups.length - 1) {
      const nextId = this.state.groups[index + 1].id;
      const field = this.state.refs[nextId];
      if (field) {
        field.focus ();
      }
    }
  }

  onPreviousField (id) {
    let index = 0;
    for (const group of this.state.groups) {
      if (group.id === id) {
        break;
      }
      index++;
    }
    if (index > 0) {
      const prevId = this.state.groups[index - 1].id;
      const field = this.state.refs[prevId];
      if (field) {
        field.focus ();
      }
    }
  }

  render () {
    let total = 0;
    let stateGroups = [];
    let set = [];
    let lastState;
    for (const group of this.state.groups) {
      if (group.favorite === true) {
        if (lastState !== group.state) {
          if (set.length > 0) {
            stateGroups.push (
              <StateGroupPlan
                key={lastState}
                groups={set}
                donations={this.state.donations}
                onPlannedChanged={this.onPlannedChanged}
                onGivenChanged={this.onGivenChanged}
                registerRef={this.onRegisterRef}
                onNextField={this.onNextField}
                onPreviousField={this.onPreviousField}
              />
            );
            set = [];
          }
          lastState = group.state;
        }
        for (const donation of this.state.donations) {
          if (donation.group === group.id) {
            total += parseInt (donation.amount.replace (/,/g, ''), 10);
            break;
          }
        }
        set.push (group);
      }
    }
    if (set.length > 0) {
      stateGroups.push (
        <StateGroupPlan
          key={lastState}
          groups={set}
          donations={this.state.donations}
          onPlannedChanged={this.onPlannedChanged}
          onGivenChanged={this.onGivenChanged}
          registerRef={this.onRegisterRef}
          onNextField={this.onNextField}
          onPreviousField={this.onPreviousField}
        />
      );
    }

    if (stateGroups.length === 0) {
      stateGroups.push (<span key='none'>No organizations selected</span>);
    }

    return (
      <div>
        <div className='planArea'>
          <div className='donorArea'>
            <h2>Plan Your Contributions</h2>
            <p>Use this worksheet to help plan how to most effectively make your
            donations to grassroots movement groups.</p>
            <p>Put in a planned donation for each group you are considering, and
            a report page will show how to give to those groups
            once you’re finished.</p>
            <div className='infoArea'>
              <h3>Your Information</h3>
              <input
                type='text'
                placeholder='First Name'
                value={this.state.firstName}
                onChange={(e) => {
                  this.context.store.dispatch (setUserFirstName (e.target.value));
                }}
              />
              <input
                type='text'
                placeholder='Last Name'
                value={this.state.lastName}
                onChange={(e) => {
                  this.context.store.dispatch (setUserLastName (e.target.value));
                }}
              />
              <input
                type='text'
                placeholder='Email'
                value={this.state.email}
                onChange={(e) => {
                  this.context.store.dispatch (setUserEmail (e.target.value));
                }}
              />
              <input
                type='text'
                placeholder='Phone'
                value={this.state.phone}
                onChange={(e) => {
                  this.context.store.dispatch (setUserPhone (e.target.value));
                }}
              />
            </div>
          </div>
          <hr />

          <div className='planDisplayArea'>
            <div className='planGroupsArea'>
              {stateGroups}
            </div>
          </div>
        </div>
        <div className='planFooter'>
          <div>
            <button onClick={() => { this.context.router.push ('/report'); }}>
              Save and Review
            </button>
            <span>Total: $ {total.toString ().replace (/\B(?=(\d{3})+\b)/g, ',')}</span>
          </div>
        </div>
      </div>
    );
  }
}

PlanPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
};
