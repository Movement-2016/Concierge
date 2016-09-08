import React from 'react';

const ContextMixin = baseClass => class extends baseClass {

  constructor() {
    super(...arguments);
    this.stateFromStore = this.stateFromStore.bind(this);
  }

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    const { store } = this.context;
    this.unsubscribe = store.subscribe( () => this.stateFromStore(store.getState()) );
    this.stateFromStore(store.getState());
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

};

const ServiceContext = baseClass => class extends ContextMixin(baseClass) {

  stateFromStore(storeState) {
    const { service } = storeState;
    this.setState({ service });
  }
};

const PageContext = baseClass => class extends ContextMixin(baseClass) {

  stateFromStore(storeState) {
    const { service } = storeState;
    const { pages, page } = this;
    const state = { pages: {} };
    pages && pages.forEach( p => state.pages[p] = service.pages[p] );
    page && (state.page = service.pages[page]);
    this.setState (state);
  }

};

module.exports = {
  ContextMixin,
  PageContext,
  ServiceContext
};
