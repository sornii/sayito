import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';

import $ from 'jquery';

import { Threads } from '../../../api/threads/threads';
import ThreadPasswords from '../../../utils/thread-passwords';

import '../../components/messageInput/messageInput';
import '../../components/messageList/messageList';
import '../../components/threadPassword/threadPassword';

import './thread.html';

Template.thread.onCreated(function threadOnCreated() {
  const name = FlowRouter.getParam('name');

  Session.set('name', name);
  Session.set('password', ThreadPasswords.retrievePassword(name));

  this.autorun(() => {
    const password = Session.get('password');
    const limit = Session.get('limit');

    this.subscribe('messages', { limit, name, password });
    this.subscribe('threads', { name, password });
  });
});

Template.thread.onDestroyed(function threadOnDestroyed() {
  Session.set('name', undefined);
  Session.set('password', undefined);
});

Template.thread.onRendered(function threadOnRendered() {
  if (Session.get('password') === undefined ||
    (this.subscriptionsReady() && Threads.find({}).count() === 0)) {
    $('#password-thread-modal')
      .modal({
        transition: 'fade up',
        closable: false,
        detachable: false,
        onDeny() {
          FlowRouter.go('home');
        },
        onApprove() {
          return false;
        },
      })
      .modal('show');
  }
});

Template.thread.events({});

Template.thread.helpers({});
