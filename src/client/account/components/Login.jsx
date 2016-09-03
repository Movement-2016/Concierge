import React from 'react';
import { login } from '../store/actions';
import FilteredInput from '../../ui/FilteredInput.jsx';

const nameChars = /[A-Za-z0-9]/;
const pwChars = /[A-Za-z0-9!@#$%^&*-+_=]/;

export default class LoginPage extends React.Component {
  constructor (props, context) {
    super (props, context);
    this.state = {
      username: '',
      password: '',
      error: false,
    };
    this.login = this.login.bind (this);
  }

  login (event) {
    event.preventDefault ();
    if (!((this.state.username === '') || (this.state.password === ''))) {
      this.context.store.dispatch (login (this.state.username, this.state.password))
      .then (() => {
        this.setState ({ error: false });
        if (this.props.location.state && this.props.location.state.nextPathname) {
          this.context.router.replace (this.props.location.state.nextPathname);
        } else {
          this.context.router.replace ('/');
        }
      })
      .catch (() => {
        this.setState ({ error: true });
      });
    }
  }

  render () {
    let errorMessage;
    if (this.state.error) {
      errorMessage = <span className='errorMessage'>Login failed, try again.</span>;
    }
    return (
      <div className='dialogUser'>
        <h2>Login</h2>
        <form onSubmit={this.login}>
          {errorMessage}
          <FilteredInput
            autoFocus
            type='text'
            placeholder='user name'
            maxLength={20}
            autoCapitalize='none'
            autoCorrect='off'
            filter={nameChars}
            onChange={(e) => {
              this.setState ({ username: e.target.value });
            }}
          />
          <input
            type='password'
            placeholder='password'
            maxLength={20}
            filter={pwChars}
            onChange={(e) => {
              this.setState ({ password: e.target.value });
            }}
          />
          <button
            className='dialogButton'
            disabled={(this.state.username === '') || (this.state.password === '')}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  location: React.PropTypes.object,
};

LoginPage.contextTypes = {
  store: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
};
