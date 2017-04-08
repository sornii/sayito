import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Threads = new Mongo.Collection('Threads');

Threads.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

export const ThreadSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        denyUpdate: true
    },
    name: {
        type: String,
        label: 'Text',
        max: 20
    },
    password: {
        type: String
    },
    creator: {
        type: String
    }
});

Threads.attachSchema(ThreadSchema);