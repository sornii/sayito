import {Meteor} from "meteor/meteor";
import {Messages} from "../messages.js";
import {Tags} from "../../tags/tags.js";

const commonFilter = {
    limit: 10, sort: {bumpAt: -1}
};

Meteor.publish('messages', function () {
    Meteor._sleepForMs(2000);
    return Messages.find({}, commonFilter);
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

    return Messages.find({tags: tagToBeUsed._id}, commonFilter);
});

Meteor.publish('messagesByIds', function (ids) {
    return Messages.find({_id: {$in: ids}});
});