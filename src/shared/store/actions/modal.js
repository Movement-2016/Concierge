const OPEN_MODAL      = 'OPEN_MODAL';
const CLOSE_MODAL     = 'CLOSE_MODAL';

const closeModal = () => ({ type: CLOSE_MODAL });

const openModal = (name,options) => ({ type: OPEN_MODAL, name, options });

module.exports = {
  closeModal,
  openModal,

  OPEN_MODAL,
  CLOSE_MODAL,
};