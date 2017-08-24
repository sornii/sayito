import { Meteor } from 'meteor/meteor';
import { Threads } from '../threads';

Meteor.publish('threads', ({ name = null, password = null }) =>
  Threads.find({ name, password }));
