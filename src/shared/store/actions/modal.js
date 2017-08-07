const OPEN_MODAL      = 'OPEN_MODAL';
const CLOSE_MODAL     = 'CLOSE_MODAL';

function closeModal(){
  return {
      type: CLOSE_MODAL
    };
}

function openModal(name,options){
  return {
      type: OPEN_MODAL,
      name,
      options
    };
}

module.exports = {
  closeModal,
  openModal,

  OPEN_MODAL,
  CLOSE_MODAL,
};