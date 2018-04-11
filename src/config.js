
const SITE_TITLE       = 'Movement Voter Project';
const ADMIN_EMAIL      = 'advisor@movement.vote';

const REGION           = 'us-west-2';
const IDENTITY_POOL_ID = 'us-west-2:6069c14f-fc12-4964-bf22-80bf919eecde';
const PLANS_ENDPOINT   = 'https://005h0deted.execute-api.us-west-2.amazonaws.com/prod';
const SYNC_DATASET     = 'gamechangerlabs:profile';

const PLAN_AUTOSAVE_INTERVAL    = 5; // seconds
const PROFILE_AUTOSAVE_INTERVAL = 7;

const WP_DEV              = false;
const WP_API_HOST         = WP_DEV ? 'http://localhost:8080/wordpress' : 'https://wp.movement.vote';
const M_SERVICE_END_POINT = WP_API_HOST + '/wp-json/movement-2018/';

const ENABLE_PLANS = false;
const ENABLE_LOGIN = false;

const Facebook = {
    providerKey: 'graph.facebook.com',
    clientId: '115757859022458',
    scope: 'public_profile,email',
    fields: 'email,first_name,last_name,picture',
    buttonOptions: {
      size: 'large',
      type: ['login_with','continue_with'][0],
      profilePick: false,
      friends: false,
      width: undefined,
      autoLogout: false
    }
  };

const Google = {
    providerKey: 'accounts.google.com',
    clientId: '549640832795-h8sjf845lqo4fia4djrs44c622408sgf.apps.googleusercontent.com',
    scope: 'profile email',
  };

module.exports = {

  ENABLE_PLANS,
  ENABLE_LOGIN,

  REGION,
  IDENTITY_POOL_ID,
  SYNC_DATASET,

  identityProviders: {
    Facebook,
    Google,
  },

  PLANS_ENDPOINT,
  ADMIN_EMAIL,
  SITE_TITLE,

  PLAN_AUTOSAVE_INTERVAL,
  PROFILE_AUTOSAVE_INTERVAL,

  M_SERVICE_END_POINT
};
