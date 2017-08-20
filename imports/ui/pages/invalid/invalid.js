import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './invalid.html';

Template.invalid.onCreated(() => {

});

Template.invalid.helpers({
  link() {
    return FlowRouter.path('tag', { tag: 'sayito' });
  },
});
