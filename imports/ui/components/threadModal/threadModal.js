import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { TAPi18n } from 'meteor/tap:i18n';

import { insert as insertThread } from '../../../api/threads/methods';

import './threadModal.html';

Template.threadModal.onCreated(function threadModalOnCreated() {
  this.errors = new ReactiveVar();
  this.state = new ReactiveDict();
  this.state.set('loading', false);
  this.state.set('error', false);

  this.insertThread = (obj) => {
    insertThread.call(obj, (err) => {
      if (err) {
        this.state.set('loading', false);
        this.state.set('error', true);
        this.errors.set([{ message: TAPi18n.__(err.error) }]);
      } else {
        this.state.set('loading', false);
        FlowRouter.go('thread', { name: obj.name });
      }
    });
  };
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
  'click .approve.button, submit .ui.form': function createThread(event, instance) {
    event.preventDefault();

    if (instance.$('.approve.button.loading').length !== 0) {
      return false;
    }

    instance.state.set('loading', true);
    instance.insertThread(instance.$('#thread-form').form('get values'));

    return undefined;
  },
  'click .error.message>.close.icon': function closeErrorMessages(event, instance) {
    event.preventDefault();
    instance.state.set('error', false);
  },
});
