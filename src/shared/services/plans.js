import { prod } from 'bellman';


/* globals AWS */


module.exports = () => {

  // after the user is signed with an Identity Pool auth'd signin

  const {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    sessionToken
  } = AWS.config.credentials;

  const cfg = {
    accessKey,
    secretKey,
    sessionToken
  };

  return prod.plans(cfg);
};