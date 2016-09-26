import {Meteor} from "meteor/meteor";
import {Messages} from "../messages.js";
import {Tags} from "../../tags/tags.js";

Meteor.publish('messages', function () {
    return Messages.find({}, {limit: 10, sort: {createdAt: -1}});
});

Meteor.publish('messagesByTag', function (tag) {
    const tagText = '#' + tag;
    const tagFound = Tags.findOne({text: tagText});

    let tagToBeUsed;

    if (tagFound) {
        tagToBeUsed = tagFound;
    } else {
        tagToBeUsed = Tags.insert({text: tagText});
    }

    return Messages.find({tags: tagToBeUsed._id}, {limit: 10, sort: {createdAt: -1}});
});

Meteor.publish('messagesByIds', function (ids) {
    return Messages.find({_id: {$in: ids}});
});

Meteor.publish('messagesThumbsup', function (idsThumbsup) {
    return Messages.find({_id: {$in: idsThumbsup}});
});

Meteor.publish('messagesThumbsdown', function (idsThumbsdown) {
    return Messages.find({_id: {$in: idsThumbsdown}});
});