
const StoreWatcher = baseClass => class extends baseClass {

  componentWillMount () {
    const { store } = this.props;
    this.stateFromStore = this.stateFromStore.bind(this);
    const stateSetter = () => this.stateFromStore(store.getState());
    !global.IS_SERVER_REQUEST && (this.unsubscribe = store.subscribe( stateSetter ));
    stateSetter();
  }

  componentWillUnmount () {
    this.unsubscribe ();
  }

  stateFromStore() {
    throw 'Derivations of StoreWatcher must implement stateFromStore';
  }

};

module.exports = StoreWatcher;

