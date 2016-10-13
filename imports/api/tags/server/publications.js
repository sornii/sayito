import {Meteor} from "meteor/meteor";
import {Tags} from "../tags.js";
import {Messages} from "../../messages/messages";
import {_} from "meteor/underscore";

//TODO: TESTES PARA TRENDING DE TAG

Meteor.publish('tagsTrending', function () {
    const date = new Date();
    date.setHours(date.getHours() - 1);

    const messages = Messages.find({createdAt: {$gte: date}}).fetch();

    const tagsCount = [];

    _.chain(messages)
        .pluck('tags')
        .flatten()
        .countBy()
        .each((count, tag) => {
            tagsCount.push({tag, count});
        });

    _.sortBy(tagsCount, 'count');
});