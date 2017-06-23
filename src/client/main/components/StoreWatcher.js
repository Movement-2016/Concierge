
const StoreWatcher = baseClass => class extends baseClass {

  componentWillMount () {
    const { store } = this.props;
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

module.exports = {
  StoreWatcher
};