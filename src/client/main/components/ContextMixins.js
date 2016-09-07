import React from 'react';

const ContextMixins = baseClass => class extends baseClass {

  constructor() {
    super(...arguments);
    const { store } = this.context;
    this.stateFromStore = this.stateFromStore.bind(this,store);
  }

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    const { store } = this.context;
    this.unsubscribe = store.subscribe( this.stateFromStore );
    this.stateFromStore();
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

};

const PageContext = baseClass => class extends ContextMixins(baseClass) {

  stateFromStore(store) {
    const { service } = store.getState ();
    const { pages, page } = this;
    const state = { pages: {} };
    pages && pages.forEach( p => state.pages[p] = service.pages[p] );
    page && (state.page = service.pages[page]);
    this.setState (state);
  }

};

const GroupsContext = baseClass => class extends ContextMixins(baseClass) {
  
  stateFromStore(store) {
    const state = store.getState ();      
    this.setState ({ groups: state.service.groups });
  }
};

module.exports = {
  PageContext,
  GroupsContext
};
