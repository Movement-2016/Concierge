import { navigateTo } from '../store/actions/router';

class Router {
  constructor(store) {
    this._store = store;
    this._routes = null;
  }

  dispatchNavigate = (path, payload) => this._store.dispatch(navigateTo(path, payload));

  alertNotFound(payload) {
    this.pathNotFound(payload);
  }

  get _currentPath() {
    // not supported on server
    return '/';
  }

  get routes() {
    return this._routes;
  }

  // Called when user hits 'back' or 'foward' button
  // or on the server with 'path'

  updateURL(popStateEvent, _path, payload = {}) {
    this.dispatchNavigate(_path || this._currentPath, payload);
  }
}

module.exports = Router;
