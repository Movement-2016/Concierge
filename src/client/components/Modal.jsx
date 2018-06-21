import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';

import { closeModal } from '../../shared/store/actions/modal';

const { defaultStyles } = ReactModal;

defaultStyles.content.width = '50%';
defaultStyles.content.margin = 'auto';
defaultStyles.overlay.top = '25px';

class _Modal extends React.Component {
  handleCloseModal() {
    this.props.closeModal();
  }

  render() {
    const { closeCaption = 'Cancel', closeButton = null, name, _name } = this.props;

    if (name !== _name) {
      return null;
    }

    const props = { ...this.props };
    ['closeButton', 'closeCaption', 'closeModal', 'children'].forEach(
      p => props[p] && delete props[p]
    );

    return (
      <ReactModal {...props}>
        {this.props.children}
        {!closeButton && <button onClick={this.handleCloseModal.bind(this)}>{closeCaption}</button>}
        {closeButton}
      </ReactModal>
    );
  }
}

const mapStateToProps = s => ({ isOpen: s.modal.open, _name: s.modal.name });
const mapDispatchToProps = { closeModal };

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Modal);

Modal.defaultStyles = _Modal.defaultStyles;

module.exports = Modal;
