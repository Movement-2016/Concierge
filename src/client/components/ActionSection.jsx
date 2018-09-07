import React from 'react';
import saveToSpreadsheet from '../services/saveToGoogleSheet';

class ActionSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formAlert: '',
    };
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({ formAlert: '' });

    let hasErrored = 0;

    const data = {
      name: this._name.value,
      email: this._email.value,
      zip: this._zip.value,
    };
    const onSuccess = () => {
      this.setState({ formAlert: 'success' });
    };
    const onError = error => {
      // retry 5 times
      if (hasErrored < 5) {
        setTimeout(saveToSpreadsheet(data, onSuccess, onError), 200);
        hasErrored++;
      } else {
        this.setState({ formAlert: 'error' });
      }
    };

    saveToSpreadsheet(data, onSuccess, onError);
  };

  render() {
    const { title, description, buttonText, successMessage, errorMessage } = this.props;
    return (
      <div className="take-action">
        <h3 className="action-title">{title}</h3>
        <p className="action-intro">{description}</p>
        <form className="action-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="input-name"
            name="name"
            ref={input => (this._name = input)}
            placeholder="Your Name"
            required
          />
          <div className="input-wrapper">
            <input
              type="email"
              className="input-email"
              name="email"
              ref={input => (this._email = input)}
              placeholder="Email"
              required
            />
            <input
              type="text"
              className="input-zip"
              name="zip"
              ref={input => (this._zip = input)}
              placeholder="Zip Code"
              required
            />
          </div>
          <button className="waves-effect waves-light submit-button" type="submit">
            {buttonText}
          </button>
          {this.state.formAlert === 'success' && (
            <div className="submit-message submit-success">{successMessage}</div>
          )}
          {this.state.formAlert === 'error' && (
            <div className="submit-message submit-error">{errorMessage}</div>
          )}
        </form>
      </div>
    );
  }
}

module.exports = ActionSection;
