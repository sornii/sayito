import { Template } from 'meteor/templating';

const modalStateHelpers = {
  approveButtonClass() {
    const instance = Template.instance();
    return instance.modalState.isLoading();
  },
  hasErrors() {
    const instance = Template.instance();
    return instance.modalState.isError();
  },
  errors() {
    const instance = Template.instance();
    return instance.modalState.getErrors();
  },
};

export default { modalStateHelpers };
