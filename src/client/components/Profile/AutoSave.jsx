import React from 'react';
import { connect } from 'react-redux';
import { syncProfile } from '../../../shared/store/actions/profile';
import { openModal } from '../../../shared/store/actions/modal';

import { PROFILE_AUTOSAVE_INTERVAL } from '../../../config';

let interval = null;

let MILLISECONDS = 1000;

class _SyncProfileButton extends React.Component {
  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.update();
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  start() {
    this.update();
    if (!interval) {
      interval = setInterval(this.update, PROFILE_AUTOSAVE_INTERVAL * MILLISECONDS);
    }
  }

  update = () => {
    const { profile, syncProfile, isLoggedIn } = this.props;

    if (isLoggedIn) {
      syncProfile(profile);
    }
  };

  render() {
    return null;
  }
}

const mapStateToProps = s => ({ isLoggedIn: s.auth.authenticated, profile: s.profile });
const mapDispatchToProps = { syncProfile, openModal };

const SyncProfileButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SyncProfileButton);

module.exports = SyncProfileButton;
