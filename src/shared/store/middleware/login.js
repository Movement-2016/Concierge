import { openModal, CLOSE_MODAL } from '../actions/modal';

const login = store => next => action => {
  
  const {
    auth: { 
      authenticated 
    },
    modal: { 
      options: {
        _postCloseDispatch = null 
      } = {}
    }
  } = store.getState() ;

  const {
    type,
    requiresLogin = false
  } = action;

  if( requiresLogin && !authenticated ) {

      store.dispatch( openModal('login', { _postCloseDispatch: action }) );
      return null;

  } else {

    if( type === CLOSE_MODAL && !!_postCloseDispatch && authenticated ) {
      store.dispatch(_postCloseDispatch);
    } 
    return next(action);    

  }
};

module.exports = login;