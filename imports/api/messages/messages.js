import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { TAPi18n } from 'meteor/tap:i18n';
import { CryptoJS } from 'meteor/jparker:crypto-md5';

import { Tags } from '../tags/tags.js';

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
    },
    hash: {
        type: String
    },
    thread: {
        type: String,
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
    hashTags() {
        return Tags.find({_id: {$in: this.tags}});
    },
    formattedText() {
        const hashTags = this.hashTags().fetch();
        let finalText = this.text;
        hashTags.forEach(function (tag) {
            finalText = finalText.replace(tag.text, tag.link());
        });
        return finalText;
    },
    link() {
        return `<a href="/said/${this.hash}">${this.hash}</a>`;
    }
});

Messages.attachSchema(MessageSchema);