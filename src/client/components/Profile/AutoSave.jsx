import React           from 'react';
import { connect }     from 'react-redux';
import { syncProfile } from '../../../shared/store/actions/profile';
import { openModal }   from '../../../shared/store/actions/modal';

let interval = null;

let ONE_THOUSAND = 1000;

let CLOCK_INTERVAL = 10000; // 10 secs

class _SyncProfileButton extends React.Component {

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  start() {
    this.update();
    if (!interval) {
      interval = setInterval(this.update, (this.props.interval * ONE_THOUSAND) || CLOCK_INTERVAL);
    }
  }

  update = () => {
    const {
      profile,
      syncProfile,
      isLoggedIn
    } = this.props;

    if( isLoggedIn ) {
        syncProfile(profile);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps    = s => ({ isLoggedIn: s.auth.authenticated, profile: s.profile  });
const mapDispatchToProps = { syncProfile, openModal };

const SyncProfileButton = connect(mapStateToProps,mapDispatchToProps)(_SyncProfileButton);

module.exports = SyncProfileButton;
