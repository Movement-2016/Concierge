/* eslint-disable no-console */
global.IS_SERVER_REQUEST = true;
global.jQuery = function() {};

const fs = require('fs');

const store = require('../shared/store');
const routeMap = require('../shared/services/route-map');
const pages = require('./pages');
const { renderHTML, navigateTo } = require('../shared/store/actions/router');
const { PUBLIC_DIR } = require('./config');

store.subscribe(() => {
  const {
    html,
    route: { path },
  } = store.getState().router;

  if (html) {
    writePage(path, html);
    triggerNextRender();
  }
});

const paths = routeMap.filter(el => !el.browserOnly).map(el => el.path);
let nextPath = 0;

function triggerRender() {
  store.dispatch(renderHTML(null));
  store.dispatch(navigateTo(paths[nextPath++], {}));
}

function triggerNextRender() {
  if (nextPath !== paths.length) {
    process.nextTick(triggerRender);
  }
}

function writePage(url, html) {
  let path = url === '/' ? PUBLIC_DIR + '/index.html' : PUBLIC_DIR + url + '/index.html';
  try {
    url !== '/' && fs.mkdirSync(PUBLIC_DIR + url);
  } catch (e) {
    /**/
  }
  try {
    fs.unlinkSync(path);
  } catch (e) {
    /**/
  }
  fs.writeFileSync(path, html);
  console.log('DONE RENDER: ', path);
}

const main = () => pages().then(triggerNextRender);

module.exports = main;
