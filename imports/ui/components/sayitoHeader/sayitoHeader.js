import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { getPath } from '../../../utils/route-utils';

import './sayitoHeader.html';

Template.sayitoHeader.helpers({
  homeLink() {
    const thread = Session.get('name');
    if (thread) {
      return getPath('thread', { thread });
    }
    return getPath('home');
  },
});
