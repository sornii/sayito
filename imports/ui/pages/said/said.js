import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Threads } from '../../../api/threads/threads';
import { getParam } from '../../../utils/route-utils';
import ThreadPasswords from '../../../utils/thread-passwords';
import { Messages } from '../../../api/messages/messages';

import '../../components/messageList/messageList';
import '../../components/threadPassword/threadPassword';

import './said.html';

Template.said.onCreated(function saidOnCreated() {
  const thread = FlowRouter.getParam('thread');

  if (thread) {
    Session.set('name', thread);
    Session.set('password', ThreadPasswords.retrievePassword(thread));
  }

  this.autorun(() => {
    const hashs = [getParam('hash')];
    const password = Session.get('password');
    this.subscribe('messagesByIds', { hashs, thread, password });
  });
});

Template.said.onDestroyed(function threadOnDestroyed() {
  Session.set('name', undefined);
  Session.set('passwords', undefined);
});

Template.said.helpers({
  messageSaid() {
    return Messages.findOne({ hash: FlowRouter.getParam('hash') });
  },
});

Template.said.onRendered(function threadOnRendered() {
  if ((Session.get('name') !== undefined && Session.get('password') === undefined) ||
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
