import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { TAPi18n } from 'meteor/tap:i18n';
import { CryptoJS } from 'meteor/jparker:crypto-md5';

export const Messages = new Mongo.Collection('Messages');

Messages.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

const MessageSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        denyUpdate: true
    },
    bumpAt: {
        type: Date
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
        type: [String],
        regEx: SimpleSchema.RegEx.Id,
        optional: true
    }
});

Messages.helpers({
    thumbsupCount () {
        if (this.thumbsup) {
            return this.thumbsup.length;
        }
        return 0;
    },
    hash() {
        return CryptoJS.MD5(this.createdAt);
    }
});

Messages.attachSchema(MessageSchema);