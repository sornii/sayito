import {Meteor} from "meteor/meteor";
import {Messages} from "../messages.js";
import {Tags} from "../../tags/tags.js";

import {commonFilter} from "../filters";

Meteor.publish('messages', function () {
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


//TODO: TESTES PARA TRENDING DE LIKE

Meteor.publish('messagesTrendingLike', function () {

});

//TODO: TESTES PARA TRENDING DE TAG

Meteor.publish('messagesTrendingTags', function () {

});