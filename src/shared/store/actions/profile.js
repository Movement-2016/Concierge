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
    .then( (hash = {}) => {
      const keys = Object.keys(hash);
      let update = true;
      if( keys.length ) {
        update = false;
        for( let i = 0; i < keys.length; i++ ) {
          const key = keys[i];
          if( profile[key] && (profile[key] !== hash[key]) ) {
            update = true;
            break;
          }
        }
      }
      return update 
        ? dataset.update( {...hash, ...profile} )
        : { hash };
    })
    .then( response => dispatch(_setProfile(response.hash)) );
};

module.exports = {
  SET_PROFILE,
  SYNC_PROFILE,

  setProfile,
  syncProfile
};

