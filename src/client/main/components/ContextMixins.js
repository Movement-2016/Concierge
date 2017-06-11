/* eslint no-console:off */

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

  stateFromStore() {
    throw 'Derivations of ContextMixin must implement stateFromStore';
  }

};

const ServiceContext = baseClass => class extends ContextMixin(baseClass) {

  stateFromStore( /* storeState */ ) {

    const state       = {};
    const propNames   = this.servicePropNames;
    const service     = this.service;
    const asyncProps  = [];

    propNames && propNames.length && propNames.forEach( propName => {
      const value = this.props[propName] || service.cachedValue(propName);
      if( value ) {
        state[propName] = value;
      } else {
        if( global.IS_SERVER_REQUEST ) {
          throw `ERROR: PROPERTY WAS NOT CACHED PROPERLY: ${propName}`;
        }
        asyncProps.push( service[propName].then( propValue => Promise.resolve( { [propName]:propValue } )) );
        state.loading = true;          
      }
    });

    const setPropStates = props => {
        var state = props.reduce( (obj,e) => {return { ...obj, ...e };}, {} );
        state.loading = false;
        this.setState( state );
      };

    this.setState(state, () => asyncProps.length && Promise.all( asyncProps ).then( setPropStates ) );

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
  ServiceMixin,
  ContextMixin,
  PageContext,
  ServiceContext,
  ContextFromService: ServiceContext
};