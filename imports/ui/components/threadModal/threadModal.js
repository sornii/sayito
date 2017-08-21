import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { TAPi18n } from 'meteor/tap:i18n';

import $ from 'jquery';

import { insert as insertThread } from '../../../api/threads/methods';

import './threadModal.html';

Template.threadModal.onCreated(function threadModalOnCreated() {
  this.errors = new ReactiveVar();
  this.state = new ReactiveDict();
  this.state.set('loading', false);
  this.state.set('error', false);
});

Template.threadModal.helpers({
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

Template.threadModal.events({
  'click .approve.button, submit .ui.form': function (event, instance) {
    event.preventDefault();

    if ($('.approve.button.loading').length !== 0) {
      return false;
    }

    instance.state.set('loading', true);

    const formValues = $('#thread-form').form('get values');
    formValues.name = formValues.threadName;
    delete formValues.threadName;

    insertThread.call(formValues, (err, res) => {
      if (err) {
        instance.state.set('loading', false);
        instance.state.set('error', true);
        instance.errors.set([{ message: TAPi18n.__(err.error) }]);
      } else {
        instance.state.set('loading', false);
        FlowRouter.go('thread', { name: formValues.name });
      }
    });
  },
  'click .error.message>.close.icon': function (event, instance) {
    event.preventDefault();
    instance.state.set('error', false);
  },
});
