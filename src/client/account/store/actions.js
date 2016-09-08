import 'whatwg-fetch';
import { SET_AUTHENTICATED, SET_PROFILE, SET_USER_FIRSTNAME, SET_USER_LASTNAME,
  SET_USER_EMAIL, SET_USER_PHONE, UPDATE_PLANNED, UPDATE_GIVEN } from './constants';


export function register (username, password) {
  return () => {
    return new Promise ((resolve, reject) => {
      const data = { username, password };
      fetch (`${location.origin}/api/register`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify (data),
      }).then (res => {
        if (!res.ok) {
          reject (res.statusText);
        } else {
          resolve ();
        }
      })
      .catch (err => {
        reject (err);
      });
    });
  };
}

export function login (username, password) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const data = { username, password };
      fetch (`${location.origin}/api/login`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify (data),
      }).then (res => {
        if (!res.ok) {
          return reject (res.statusText);
        } else {
          return res.json ();
        }
      }).then (user => {
        dispatch (setAuthenticated (true, user.username));
        dispatch (setProfile (user.firstName, user.lastName, user.email,
          user.phone, user.favorites, user.donations));
        //dispatch (setSelectedGroups (user.favorites));
        return resolve ();
      }).catch (err => {
        return reject (err);
      });
    });
  };
}

export function logout () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      dispatch (setAuthenticated (false, ''));
      dispatch (setProfile ('', '', '', '', [], []));
      //dispatch (setSelectedGroups ([]));

      fetch (`${location.origin}/api/logout`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
      }).then (() => {
        return resolve ();
      }).catch (err => {
        return reject (err);
      });
    });
  };
}

export function verifyLogin () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (`${location.origin}/api/verifylogin`, {
        method: 'get',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
      }).then (res => {
        if (!res.ok) {
          return reject (res.statusText);
        } else {
          return res.json ();
        }
      }).then (data => {
        if (data.authenticated) {
          dispatch (setAuthenticated (true, data.user.username));
          dispatch (setProfile (data.user.firstName, data.user.lastName, data.user.email,
            data.user.phone, data.user.favorites, data.user.donations));
          // TODO: fix this when data is loaded
          // dispatch (setSelectedGroups (data.user.favorites));
          return resolve (true);
        } else {
          dispatch (setAuthenticated (false, ''));
          dispatch (setProfile ('', '', '', '', [], []));
          // TODO: fix this when data is loaded
          //dispatch (setSelectedGroups ([]));
          return resolve (false);
        }
      }).catch (err => {
        return reject (err);
      });
    });
  };
}

export function setAuthenticated (authenticated, username) {
  return { type: SET_AUTHENTICATED, authenticated, username };
}

export function updateProfile (firstName, lastName, email, phone, favorites, donations) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const data = {
        firstName,
        lastName,
        email,
        phone,
        favorites,
        donations,
      };
      fetch (`${location.origin}/api/profile`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify (data),
      }).then (res => {
        if (!res.ok) {
          return reject (res.statusCode);
        } else {
          dispatch (setProfile (firstName, lastName, email, phone, favorites, donations));
          return resolve ();
        }
      }).catch (err => {
        return reject (err);
      });
    });
  };
}

export function setProfile (firstName, lastName, email, phone, favorites, donations) {
  return { type: SET_PROFILE, firstName, lastName, email, phone, favorites, donations };
}

// Save current profile to server
export function saveProfile () {
  return (dispatch, getState) => {
    return new Promise ((resolve, reject) => {
      const user = getState ().user;
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        favorites: user.favorites,
        donations: user.donations,
      };
      fetch (`${location.origin}/api/profile`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify (data),
      }).then (res => {
        if (!res.ok) {
          return reject (res.statusCode);
        } else {
          return resolve ();
        }
      }).catch (err => {
        return reject (err);
      });
    });
  };
}

export function setUserFirstName (firstName) {
  return { type: SET_USER_FIRSTNAME, firstName };
}

export function setUserLastName (lastName) {
  return { type: SET_USER_LASTNAME, lastName };
}

export function setUserEmail (email) {
  return { type: SET_USER_EMAIL, email };
}

export function setUserPhone (phone) {
  return { type: SET_USER_PHONE, phone };
}

export function updatePlanned (group, amount) {
  return { type: UPDATE_PLANNED, group, amount };
}

export function updateGiven (group, given) {
  return { type: UPDATE_GIVEN, group, given };
}
