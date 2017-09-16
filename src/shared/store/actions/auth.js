import providers from '../../services/auth/providers';

const SET_CREDENTIALS      = 'SET_CREDENTIALS';
const CLEAR_CREDENTIALS    = 'CLEAR_CREDENTIALS';
const SET_AUTH_PROVIDER    = 'SET_AUTH_PROVIDER';

const clearCredentails = () => (dispatch,getState) => {
  const idProvider = providers.find( getState().auth.provider );
  idProvider.logout().then( () => dispatch({ type: CLEAR_CREDENTIALS }) );
};

const setCredentails = credentials => ({
    type: SET_CREDENTIALS,
    credentials
});

const setProvider = provider => ({
  type: SET_AUTH_PROVIDER,
  provider
});

module.exports = {
  clearCredentails,
  setCredentails,
  setProvider,

  SET_CREDENTIALS,
  CLEAR_CREDENTIALS,
  SET_AUTH_PROVIDER
};