const path = require('path');

const BODY_REGEX           = /(<div id="app">)(<!-- RENDER CONTENT -->)(<\/div>)/;
const SSL_PATH             = '/etc/letsencrypt/live/movementvote.org/';
const SSL_PORT             = 4000;
const PUBLIC_DIR           = path.join(__dirname, '../public');
const PATH_TO_INDEX_HTML   = PUBLIC_DIR + '/index.html';
const PATH_TO_404_TEMPLATE = PATH_TO_INDEX_HTML;
const REGEX_404            = BODY_REGEX;

module.exports = {
  BODY_REGEX,
  PATH_TO_INDEX_HTML,
  SSL_PORT,
  SSL_PATH,
  PUBLIC_DIR,
  PATH_TO_404_TEMPLATE,
  REGEX_404
};