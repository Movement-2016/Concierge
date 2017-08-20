
const REGION           = 'us-west-2';
const IDENTITY_POOL_ID = 'us-west-2:544ed35f-6bdb-4e28-b9a2-fca1ddbc4e7b';

const PLANS_ENDPOINT   = 'https://ejy2t55834.execute-api.us-west-2.amazonaws.com/prod';

const SYNC_DATASET     = 'gamechangerlabs:profile';

const ADMIN_EMAIL      = 'advisor@movementvote.org';

const SITE_TITLE       = 'Movement 2017';

const PLAN_AUTOSAVE_INTERVAL = 5; // seconds
const PROFILE_AUTOSAVE_INTERVAL = 7;

const WP_DEV              = false;
const WP_API_HOST         = WP_DEV ? 'http://localhost:8080/wordpress' : 'https://wp.movementvote.org';
const M_SERVICE_END_POINT = WP_API_HOST + '/wp-json/movement-2018/';


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
  REGION,
  IDENTITY_POOL_ID,
  SYNC_DATASET,

  IdentityProviders: {
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