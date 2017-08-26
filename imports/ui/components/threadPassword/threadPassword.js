import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { TAPi18n } from 'meteor/tap:i18n';

import $ from 'jquery';

import ModalState from '../utils/modalState';
import AttachableHelpers from '../utils/attachableHelpers';
import ThreadPasswords from '../../../utils/thread-passwords';
import { verify } from '../../../api/threads/methods';

import './threadPassword.html';

Template.threadPassword.onCreated(function threadPasswordOnCreated() {
  this.modalState = new ModalState();
});

Template.threadPassword.helpers({ ...AttachableHelpers.modalStateHelpers });

Template.threadPassword.events({
  'click .approve.button, submit .ui.form': function setThreadPassword(event, instance) {
    event.preventDefault();

    instance.modalState.setLoadingState();

    const $threadForm = $('#password-thread-modal');

    const name = Session.get('name');
    const password = $threadForm.form('get values').password;

    verify.call({ name, password }, (err) => {
      if (err) {
        instance.modalState.setErrorState([{ message: TAPi18n.__(err.error) }]);
      } else {
        Session.set('password', password);
        ThreadPasswords.savePassword(name, password);
        instance.modalState.initialState();
        $threadForm.modal('hide');
      }
    });
  },
  'click .error.message>.close.icon': function closeErrorMessages(event, instance) {
    event.preventDefault();
    instance.modalState.initialState();
  },
});
