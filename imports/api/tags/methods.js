import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {TAPi18n} from "meteor/tap:i18n";
import {Messages} from "../messages/messages.js";

//TODO: TESTES PARA TRENDING DE TAG

export const tagsTrending = new ValidatedMethod({
    name: 'tags.trending',
    validate: new SimpleSchema({
    }).validator(),
    run({}) {
        const date = new Date();
        date.setHours(date.getHours() - 1);

        const messages = Messages.find({createdAt: {$gte: date}}).fetch();

        const tagsCount = [];

        const lol = _.chain(messages)
            .pluck('tags')
            .flatten()
            .countBy()
            .each((count, tag) => {
                tagsCount.push({tag, count});
            })
            .value();

        console.log(_.sortBy(tagsCount, 'count'));
    }
});