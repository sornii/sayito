import {SyncedCron} from "meteor/percolate:synced-cron";
import {Messages} from "../../api/messages/messages.js";
import {TrendingTags} from "../../api/trendingTags/trendingTags.js";

const RANK_UP_HASHTAG_CRON_NAME = "Cron to rank up the hashtags";

SyncedCron.config({
    collectionName: 'crons'
});

SyncedCron.add({
    name: 'Remove rank up history',
    schedule: function (parser) {
        return parser.text('every 1 hour');
    },
    job: function () {
        SyncedCron._collection.remove({name: RANK_UP_HASHTAG_CRON_NAME});
    }
});

SyncedCron.add({
    name: 'Cron to rank up the hashtags',
    schedule: function (parser) {
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