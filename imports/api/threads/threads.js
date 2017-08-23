import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Threads = new Mongo.Collection('Threads');

Threads.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const ThreadSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  name: {
    type: String,
    max: 20,
    index: true,
    unique: true,
  },
  password: {
    type: String,
  },
  creator: {
    type: String,
  },
});

Threads.attachSchema(ThreadSchema);
