const OPEN_MODAL      = 'OPEN_MODAL';
const CLOSE_MODAL     = 'CLOSE_MODAL';

function closeModal(){
  return {
      type: CLOSE_MODAL
    };
}

function openModal(name){
  return {
      type: OPEN_MODAL,
      name
    };
}

module.exports = {
  closeModal,
  openModal,

  OPEN_MODAL,
  CLOSE_MODAL,
};