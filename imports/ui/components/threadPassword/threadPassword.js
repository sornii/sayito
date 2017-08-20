import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { TAPi18n } from 'meteor/tap:i18n';

import $ from 'jquery';

import ThreadPasswords from '../../../utils/thread-passwords';
import { verify } from '../../../api/threads/methods';

import './threadPassword.html';

Template.threadPassword.onCreated(function () {
  this.errors = new ReactiveVar();
  this.state = new ReactiveDict();
  this.state.set('loading', false);
  this.state.set('error', false);
});

Template.threadPassword.helpers({
  approveButtonClass() {
    const instance = Template.instance();
    return instance.state.get('loading') ? 'loading' : '';
  },
  hasErrors() {
    const instance = Template.instance();
    return instance.state.get('error');
  },
  errors() {
    const instance = Template.instance();
    return instance.errors.get();
  },
});

Template.threadPassword.events({
  'click .approve.button, submit .ui.form': function (event, instance) {
    event.preventDefault();

    instance.state.set('loading', true);

    const $threadForm = $('#password-thread-modal');

    const name = Session.get('name');
    const password = $threadForm.form('get values').password;

    verify.call({ name, password }, (err, res) => {
      if (err) {
        instance.state.set('loading', false);
        instance.state.set('error', true);
        instance.errors.set([{ message: TAPi18n.__(err.error) }]);
      } else {
        Session.set('password', password);
        ThreadPasswords.savePassword(name, password);
        instance.state.set('loading', false);
        $threadForm.modal('hide');
      }
    });
  },
  'click .error.message>.close.icon': function (event, instance) {
    event.preventDefault();
    instance.state.set('error', false);
  },
});
