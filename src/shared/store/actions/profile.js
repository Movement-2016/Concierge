import dataset from '../../services/user-dataset';
import shallowEqual from '../../lib/shallowEqual';

const SET_PROFILE = 'SET_PROFILE';
const SYNC_PROFILE = 'SYNC_PROFILE';

const setProfile = profile => ({
  type: SET_PROFILE, 
  profile
});

// const setProfile = profile => dispatch => {
//   dataset.update( profile ).then( () => dispatch(_setProfile(profile)) );
// };

const syncProfile = profile => dispatch => {
  dataset.list()
    .then( (hash = {}) => {
      return shallowEqual(profile,hash)
        ? { hash }
        : dataset.update( {...hash, ...profile} );
    })
    .then( response => dispatch(setProfile(response.hash)) );
};

module.exports = {
  SET_PROFILE,
  SYNC_PROFILE,

  setProfile,
  syncProfile
};

