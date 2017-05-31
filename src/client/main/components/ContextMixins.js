import React from 'react';

const ContextMixin = baseClass => class extends baseClass {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  get storeState() {
    return this.context.store.getState();
  }

  get service() {
    return this.storeState.service;
  }

};

const ContextFromStore = baseClass => class extends ContextMixin(baseClass) {

  constructor() {
    super(...arguments);

    !global.IS_SERVER_REQUEST && (this.stateFromStore = this.stateFromStore.bind(this));
  }

  componentWillMount () {
    const { store } = this.context;
    const stateSetter = () => {
      console.log('stateSetter called.')
      this.stateFromStore(this.storeState);
    }
    !global.IS_SERVER_REQUEST && (this.unsubscribe = store.subscribe( stateSetter ));
    this.stateFromStore(this.storeState);
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  stateFromStore() {
    return;
  }

};

const ContextFromService = baseClass => class extends ContextFromStore(baseClass) {

  componentWillMount () {
    super.componentWillMount();
    this.initialStateFromService();
  }

  // Checks if servicePropNames has been set, then retrieves named props from service object and adds to element's state
  initialStateFromService() {
    const state = {};
    const propNames = this.servicePropNames;
    const service = this.service;
    if (propNames) {
      state.loading = true;
      if( global.IS_SERVER_REQUEST ) {
        console.log( "WARNING: MAKING PROMISE REQUEST FROM SERVICE: ", propNames);
      }
      service.content.then( () => {
        propNames.forEach( propName => state[propName] = service[propName] );
        state.loading = false;
        this.setState( state );
      });
      this.setState( state );
    }
  }

};

const PageContext = baseClass => class extends ContextMixin(baseClass) {

  constructor() {
    super(...arguments);
    if( this.props.page ) {
      this.state = { page: this.props.page };
    } else {
      this.service.getPage(this.page).then( page => this.setState( {page,loading:false} ) );
      this.state = { loading: true };
    }
  }

};

module.exports = {
  ContextFromStore,
  ContextFromService,
  PageContext
};
