import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import $ from 'jquery';

import { Messages } from '../../../api/messages/messages';
import { MessagesFilter } from '../../../api/messages/filters';

import '../../components/dummy/dummy';
import './messageList.html';

Template.messageList.onCreated(function messageListOnCreated() {
  const limit = 5;

  Session.set('limit', limit);

  this.increaseLimit = () =>
    Session.set('limit', Session.get('limit') + limit);
});

Template.messageList.onRendered(function messageListOnRendered() {
  const instance = this;

  $('.ui.feed.sayito.messages')
    .visibility({
      once: false,
      initialCheck: false,
      // observeChanges: true,
      onBottomVisible() {
        instance.increaseLimit();
      },
    });
});

Template.messageList.helpers({
  messages() {
    return Messages.find({}, MessagesFilter.common({ limit: Session.get('limit') }));
  },
});

Template.messageList.events({});
