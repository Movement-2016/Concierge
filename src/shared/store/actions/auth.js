const SET_CREDENTIALS      = 'SET_CREDENTIALS';
const CLEAR_CREDENTIALS    = 'CLEAR_CREDENTIALS';
const SET_AUTH_PROVIDER    = 'SET_AUTH_PROVIDER';

function clearCredentails(){
  return {
      type: CLEAR_CREDENTIALS
    };
}

function setCredentails(credentials){
  return {
      type: SET_CREDENTIALS,
      credentials
    };
}

function setProvider(provider) {
  return {
      type: SET_AUTH_PROVIDER,
      provider
    };
}

module.exports = {
  clearCredentails,
  setCredentails,
  setProvider,

  SET_CREDENTIALS,
  CLEAR_CREDENTIALS,
  SET_AUTH_PROVIDER
};