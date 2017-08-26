import { ReactiveDict } from 'meteor/reactive-dict';

class ModalState extends ReactiveDict {
  constructor() {
    super();
    this.initialState();
  }

  initialState() {
    this.set(ModalState.loading, false);
    this.set(ModalState.errors, undefined);
  }

  getErrors() {
    return this.get(ModalState.errors);
  }

  isLoading() {
    return this.get(ModalState.loading);
  }

  isError() {
    return this.get(ModalState.errors) !== undefined;
  }

  setLoadingState() {
    this.set(ModalState.loading, true);
    this.set(ModalState.errors, undefined);
  }

  setErrorState(errors) {
    this.set(ModalState.loading, false);
    this.set(ModalState.errors, errors);
  }
}

ModalState.loading = 0;
ModalState.errors = 1;

export default ModalState;
