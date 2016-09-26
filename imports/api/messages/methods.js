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

        return Messages.insert({text, tags, createdAt: new Date()});
    }
});

export const thumbsup = new ValidatedMethod({
    name: 'messages.thumbsup',
    validate: new SimpleSchema({
        id: {type: String}
    }).validator(),
    run({id}) {
        Messages.update({
            _id: id
        }, {
            $inc: {
                thumbsup: 1
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
        Messages.update({
            _id: id
        }, {
            $inc: {
                thumbsup: -1
            }
        });
    }
});