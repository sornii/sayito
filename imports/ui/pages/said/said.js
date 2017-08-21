import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Messages } from '../../../api/messages/messages';

import '../../components/messageList/messageList';
import '../../components/loading/loading';

import './said.html';

Template.said.onCreated(function saidOnCreated() {
  this.autorun(() => {
    const hashs = [FlowRouter.getParam('hash')];
    this.subscribe('messagesByIds', { hashs });
  });
});

Template.said.helpers({
  messageSaid() {
    return Messages.findOne({ hash: FlowRouter.getParam('hash') });
  },
});
