import React from 'react';


const ServiceMixin = baseClass => class extends baseClass {

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

const ContextMixin = baseClass => class extends ServiceMixin(baseClass) {

  constructor() {
    super(...arguments);
    !global.IS_SERVER_REQUEST && (this.stateFromStore = this.stateFromStore.bind(this));
  }

  componentWillMount () {
    const { store } = this.context;
    const stateSetter = () => this.stateFromStore(store.getState());
    !global.IS_SERVER_REQUEST && (this.unsubscribe = store.subscribe( stateSetter ));
    this.stateFromStore(store.getState());
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

};

const ServiceContext = baseClass => class extends ContextMixin(baseClass) {

  stateFromStore( /* storeState */ ) {

    const state       = {};
    const propName    = this.contextPropName;
    const service     = this.service;

    if( propName ) {
      const value = this.props[propName] || service.cachedValue(propName);
      if( value ) {
        state[propName] = value;
      } else {
        if( global.IS_SERVER_REQUEST ) {
          console.log( "WARNING: MAKING PROMISE REQUEST FROM SERVICE: ", propName);
        }
        service[propName].then( propValue => this.setState( { [propName]:propValue, loading: false } ));
        state.loading = true;
      }
    }
    this.setState(state);
  }
};

const PageContext = baseClass => class extends ServiceMixin(baseClass) {

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
  ContextMixin,
  PageContext,
  ServiceContext
};
