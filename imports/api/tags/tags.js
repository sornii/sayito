import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tags = new Mongo.Collection('Tags');

Tags.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

export const TagSchema = new SimpleSchema({
    text: {
        type: String,
        label: 'Text',
        max: 20
    }
});

Tags.attachSchema(TagSchema);