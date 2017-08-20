import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import '../../components/messageInput/messageInput';
import '../../components/messageList/messageList';
import '../../components/loading/loading';
import '../../components/dummy/dummy';

import './home.html';

Template.home.onRendered(() => {
});

Template.home.onCreated(function homeOnCreated() {
  Tracker.autorun(() => {
    const name = Session.get('name');
    const password = Session.get('password');
    const limit = Session.get('limit');
    this.subscribe('messages', { limit, name, password });
  });
});

Template.home.helpers({});

