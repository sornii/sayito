import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Threads } from '../../../api/threads/threads';
import ThreadPasswords from '../../../utils/thread-passwords';

import '../../components/messageInput/messageInput';
import '../../components/messageList/messageList';
import '../../components/loading/loading';
import '../../components/dummy/dummy';

import './tag.html';

Template.tag.onCreated(function threadOnCreated() {
  const thread = FlowRouter.getParam('thread');

  if (thread) {
    Session.set('name', thread);
    Session.set('password', ThreadPasswords.retrievePassword(thread));
  }

  this.autorun(() => {
    const tag = FlowRouter.getParam('tag');
    const password = Session.get('password');
    const limit = Session.get('limit');
    this.subscribe('messagesByTag', { limit, tag, thread, password });
    this.subscribe('threads', { name: thread, password });
  });
});

Template.tag.onDestroyed(function threadOnDestroyed() {
  Session.set('name', undefined);
  Session.set('password', undefined);
});

Template.tag.onRendered(function threadOnRendered() {
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
