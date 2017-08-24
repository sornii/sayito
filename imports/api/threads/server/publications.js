import { Meteor } from 'meteor/meteor';
import { Threads } from '../threads';

Meteor.publish('threads', ({ name = null, password = null }) => {
  return Threads.find({ name, password });
});
