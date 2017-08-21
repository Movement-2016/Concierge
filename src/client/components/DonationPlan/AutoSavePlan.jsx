import React         from 'react';
import { connect }   from 'react-redux';
import { savePlan }  from '../../../shared/store/actions/plan';
import { openModal } from '../../../shared/store/actions/modal';
import ActionButton  from './ActionButton.jsx';
import { PLAN_AUTOSAVE_INTERVAL } from '../../../config';

let interval = null;

const MILLISECONDS = 1000;

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
      this.update();
    }
  }

  start() {
    this.update();
    if (!interval) {
      interval = setInterval(this.update.bind(this), PLAN_AUTOSAVE_INTERVAL * MILLISECONDS );
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

const mapStateToProps    = ({ plan:{status}, auth:{authenticated} }) => ({ status, isLoggedIn: authenticated });
const mapDispatchToProps = { savePlan, openModal };

const SavePlanButton = connect(mapStateToProps,mapDispatchToProps)(_SavePlanButton);

module.exports = SavePlanButton;
