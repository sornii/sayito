import { Template } from 'meteor/templating';

const modalStateHelpers = {
  approveButtonClass() {
    const instance = Template.instance();
    return instance.modalState.get('loading') ? 'loading' : '';
  },
  hasErrors() {
    const instance = Template.instance();
    return instance.modalState.get('error');
  },
  errors() {
    const instance = Template.instance();
    return instance.modalState.get('errors');
  },
};

export default { modalStateHelpers };
