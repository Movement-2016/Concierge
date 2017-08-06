import React         from 'react';
import { connect }   from 'react-redux';
import { savePlan }  from '../../../shared/store/actions/plan';
import { openModal } from '../../../shared/store/actions/modal';
import ActionButton  from './ActionButton.jsx';

let interval = null;

let CLOCK_INTERVAL = 5000; // 5 secs


class _SavePlanButton extends React.Component {


  constructor() {
    super(...arguments);
    this.state = { done: false, error: false };
    this.prevStatus = '';
  }

  componentDidMount() {
    this.start();
  }

  shouldComponentUpdate(nextProps) {
    const nextStatus = Object.keys( nextProps.status )[0];
    return this.props.isLoggedIn !== nextProps.isLoggedIn || nextStatus !== this.prevStatus;
  }

  componentDidUpdate(nextProps) {
    this.prevStatus = Object.keys( nextProps.status )[0];
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
      status,
      savePlan,
      onDone,
      onError,
      isLoggedIn
    } = this.props;

    onDone('');
    onError('');

    if( isLoggedIn ) {
      if( status.dirty ) {
        onDone('saving...');
        savePlan();
      } else if( status.saved ) {
        onDone('plan saved');
      } else if( status.error ) {
        onError('error saving plan');
      }
    }
  }

  render() {
    const {
      isLoggedIn,
      openModal
    } = this.props;

    if( !isLoggedIn ) {
      return <ActionButton onClick={() => openModal('login')}>{'Login to Save'}</ActionButton>;
    }
    return null;
  }
}

const mapStateToProps    = s => ({ status: {...s.plan.status}, isLoggedIn: s.auth.authenticated });
const mapDispatchToProps = { savePlan, openModal };

const SavePlanButton = connect(mapStateToProps,mapDispatchToProps)(_SavePlanButton);

module.exports = SavePlanButton;
