import dataset from '../../services/user-dataset';

const SET_PROFILE = 'SET_PROFILE';
const SYNC_PROFILE = 'SYNC_PROFILE';

const _setProfile = profile => ({
  type: SET_PROFILE, 
  profile
});

const setProfile = _setProfile;

// const setProfile = profile => dispatch => {
//   dataset.update( profile ).then( () => dispatch(_setProfile(profile)) );
// };

const syncProfile = profile => dispatch => {
  dataset.list()
    .then( hash => dataset.update( {...hash, ...profile} ) )
    .then( response => dispatch(_setProfile(response.hash)) );
};

module.exports = {
  SET_PROFILE,
  SYNC_PROFILE,

  setProfile,
  syncProfile
};

