import { Meteor } from 'meteor/meteor';
import { Threads } from '../threads';

Meteor.publish('threads', ({ name, password }) => {
  if (!name || !password) {
    return;
  }

  return Threads.find({ name, password });
});
