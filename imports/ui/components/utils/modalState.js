import { ReactiveDict } from 'meteor/reactive-dict';

export default class ModalState {
  constructor(instance) {
    this.instance = instance;
  }

  initialStates() {
    this.instance.modalState = new ReactiveDict();
    this.instance.modalState.set('loading', false);
    this.instance.modalState.set('error', false);
    this.instance.modalState.set('errors', undefined);
  }

  createErrors(errors) {
    this.instance.modalState.set('loading', false);
    this.instance.modalState.set('error', true);
    this.instance.modalState.set('errors', errors);
  }
}
