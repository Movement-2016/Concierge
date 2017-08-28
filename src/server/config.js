import path from 'path';

const BODY_REGEX           = /(<div id="app">)(<!-- RENDER CONTENT -->)(<\/div>)/;
const PUBLIC_DIR           = path.join(__dirname, '../public');
const PATH_TO_INDEX_HTML   = PUBLIC_DIR + '/index.app.html';

module.exports = {
  BODY_REGEX,
  PATH_TO_INDEX_HTML,
  PUBLIC_DIR,
};