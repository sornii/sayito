import {SyncedCron} from 'meteor/percolate:synced-cron';
import {Messages} from "../../api/messages/messages.js";
import {TrendingTags} from "../../api/trendingTags/trendingTags.js";

SyncedCron.config({
    collectionName: 'crons'
});

SyncedCron.add({
    name: 'Uses the force to rank up the most used tags in the last five seconds',
    schedule: function (parser) {
        //TODO: change it to a higher value
        return parser.text('every 5 seconds');
    },
    job: function () {
        const date = new Date();
        date.setHours(date.getHours() - 1);

        const messages = Messages.find({createdAt: {$gte: date}}).fetch();

        const tagsCounted = _.chain(messages)
            .pluck('tags')
            .flatten()
            .countBy()
            .map((count, tag) => ({count, tag}))
            .sortBy('count')
            .reverse()
            .slice(0, 10)
            .value();

        TrendingTags.remove({rank: {$gt: tagsCounted.length}});

        tagsCounted.forEach((tagCounted, index) => {
            const found = TrendingTags.findOne({rank: index});
            if (found) {
                if (found.tag != tagCounted.tag) {
                    TrendingTags.update({rank: index}, {$set: {tag: tagCounted.tag}});
                }
            } else {
                TrendingTags.insert({rank: index, tag: tagCounted.tag});
            }
        });

        return tagsCounted;
    }
});