import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { hasThumbsup, removeThumbsup, thumbsup } from '../../../api/messages/methods';

import './messageThumbsup.html';

Template.messageThumbsup.helpers({
  thumbsupClass() {
    const id = this.message._id;

    if (hasThumbsup.call({ id })) {
      return '';
    }

    return 'outline';
  },
});

Template.messageThumbsup.events({
  'click .thumbs.up': function (event) {
    event.preventDefault();

    const id = this.message._id;

    if (hasThumbsup.call({ id })) {
      removeThumbsup.call({ id });
    } else {
      thumbsup.call({ id });
    }
  },
});
