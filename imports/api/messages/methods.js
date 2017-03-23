import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {TAPi18n} from "meteor/tap:i18n";
import {Messages} from "./messages.js";
import {Tags} from "../tags/tags.js";

export const insert = new ValidatedMethod({
    name: 'messages.insert',
    validate: new SimpleSchema({
        text: {type: String, max: 140}
    }).validator(),
    run({text}) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        const regex = /\B#(\w*[A-Za-z_]+\w*)/g;

        const tags = [];

        let match = regex.exec(text);
        while (match != null) {
            const tagText = match[0];
            const tag = Tags.findOne({text: tagText});

            if (tag) {
                tags.push(tag._id);
            } else {
                tags.push(Tags.insert({text: tagText}));
            }

            match = regex.exec(text);
        }

        if (tags.length == 0) {
            throw new Meteor.Error('messages.insert.hasNoTags', TAPi18n.__('messages_no_tags'));
        }

        const date = new Date();
        const hash = CryptoJS.MD5(date.getTime().toString()).toString();
        return Messages.insert({text, tags, hash, createdAt: date, bumpAt: date});
    }
});

export const hasThumbsup = new ValidatedMethod({
    name: 'messages.hasThumbsup',
    validate: new SimpleSchema({
        id: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({id}) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        return Messages.find({_id: id, thumbsup: this.userId}, {limit: 1}).count() == 1;
    }
});

export const thumbsup = new ValidatedMethod({
    name: 'messages.thumbsup',
    validate: new SimpleSchema({
        id: {type: String, regEx: SimpleSchema.RegEx.Id}
    }).validator(),
    run({id}) {
        if (hasThumbsup.call({id})) {
            throw new Meteor.Error('not-authorized');
        }

        Messages.update({
            _id: id
        }, {
            $addToSet: {
                thumbsup: this.userId
            },
            $set: {
                bumpAt: new Date()
            }
        });
    }
});

export const removeThumbsup = new ValidatedMethod({
    name: 'messages.removeThumbsup',
    validate: new SimpleSchema({
        id: {type: String}
    }).validator(),
    run({id}) {
        if (!hasThumbsup.call({id})) {
            throw new Meteor.Error('not-authorized');
        }

        Messages.update({
            _id: id
        }, {
            $pull: {
                thumbsup: this.userId
            }
        });
    }
});