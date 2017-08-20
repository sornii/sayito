import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import '../../components/messageInput/messageInput';
import '../../components/messageList/messageList';
import '../../components/loading/loading';
import '../../components/dummy/dummy';

import './tag.html';

Template.tag.onRendered(() => {

});

Template.tag.onCreated(function tagOnCreated() {
  Tracker.autorun(() => {
    const tag = FlowRouter.getParam('tag');
    const name = Session.get('name');
    const password = Session.get('password');
    const limit = Session.get('limit');
    this.subscribe('messagesByTag', { limit, tag, name, password });
  });
});

Template.tag.helpers({});
