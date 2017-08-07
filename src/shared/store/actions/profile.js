import dataset from '../../services/user-dataset';

const SET_PROFILE = 'SET_PROFILE';
const SYNC_PROFILE = 'SYNC_PROFILE';

const diffProfiles = (a,b) => {
  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);
  if( keys1.length !== keys2.length ) {
    return false;
  }
  keys1.sort();
  keys2.sort();
  for( var i = 0; i < keys1.length; i++ ) {
    const k = keys1[i];
    if( k !== keys2[i] || a[k] !== b[k] ) {
      return false;
    }
  }
  return true;
};

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
      return diffProfiles(profile,hash)
        ? { hash }
        : dataset.update( {...hash, ...profile} );
    })
    .then( response => dispatch(_setProfile(response.hash)) );
};

module.exports = {
  SET_PROFILE,
  SYNC_PROFILE,

  setProfile,
  syncProfile
};

