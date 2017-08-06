import React           from 'react';
import { connect }     from 'react-redux';
import { syncProfile } from '../../../shared/store/actions/profile';
import { openModal }   from '../../../shared/store/actions/modal';
import ActionButton    from '../DonationPlan/ActionButton.jsx';

let interval = null;

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
      interval = setInterval(this.update.bind(this), this.props.interval || CLOCK_INTERVAL);
    }
  }

  update() {
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
    const {
      isLoggedIn,
      openModal
    } = this.props;

    if( !isLoggedIn ) {
      return <ActionButton onClick={() => openModal('login')}>{'Login to Get From Social Media'}</ActionButton>;
    }
    return null;
  }
}

const mapStateToProps    = s => ({ isLoggedIn: s.auth.authenticated, profile: s.profile  });
const mapDispatchToProps = { syncProfile, openModal };

const SyncProfileButton = connect(mapStateToProps,mapDispatchToProps)(_SyncProfileButton);

module.exports = SyncProfileButton;
