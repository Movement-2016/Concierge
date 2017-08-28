import { prod, dev } from 'bellman';


/* globals AWS */

let cacheKey = null;
let cache = {};

module.exports = (stage,service) => {

  // after the user is signed with an Identity Pool auth'd signin

  const {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    sessionToken
  } = AWS.config.credentials;

  if( !accessKey || cacheKey !== accessKey ) {
    cache = {};
  } else if( accessKey && cacheKey === accessKey && cache[stage+service]) {
    return cache[stage+service];
  }

  cacheKey = accessKey;

  const cfg = {
    accessKey,
    secretKey,
    sessionToken
  };

  return cache[stage+service] = (stage === 'prod' ? prod : dev)[service](cfg);
};