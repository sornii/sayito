import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { TAPi18n } from 'meteor/tap:i18n';

import ModalState from '../utils/modalState';
import AttachableHelpers from '../utils/attachableHelpers';
import { insert as insertThread } from '../../../api/threads/methods';

import './threadModal.html';

Template.threadModal.onCreated(function threadModalOnCreated() {
  this.modalState = new ModalState();

  this.insertThread = (obj) => {
    insertThread.call(obj, (err) => {
      if (err) {
        this.modalState.setErrorState([{ message: TAPi18n.__(err.error) }]);
      } else {
        this.modalState.initialState();
        FlowRouter.go('thread', { name: obj.name });
      }
    });
  };
});

Template.threadModal.helpers({ ...AttachableHelpers.modalStateHelpers });

Template.threadModal.events({
  'click .approve.button, submit .ui.form': function createThread(event, instance) {
    event.preventDefault();

    if (instance.$('.approve.button.loading').length !== 0) {
      return false;
    }

    instance.modalState.setLoadingState();
    instance.insertThread(instance.$('#thread-form').form('get values'));

    return undefined;
  },
  'click .error.message>.close.icon': function closeErrorMessages(event, instance) {
    event.preventDefault();
    instance.modalState.initialState();
  },
});
