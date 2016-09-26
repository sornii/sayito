import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { TAPi18n } from 'meteor/tap:i18n';

export const Messages = new Mongo.Collection('Messages');

Messages.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

//todo: createdAt
const MessageSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        denyUpdate: true
    },
    text: {
        type: String,
        max: 140
    },
    tags: {
        type: [String],
        regEx: SimpleSchema.RegEx.Id
    },
    thumbsup: {
        type: Number,
        defaultValue: 0
    }
});

Messages.attachSchema(MessageSchema);