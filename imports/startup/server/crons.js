import { SyncedCron } from 'meteor/percolate:synced-cron';

import _ from 'underscore';

import { Messages } from '../../api/messages/messages.js';
import { TrendingTags } from '../../api/trendingTags/trendingTags.js';

const RANK_UP_HASHTAG_CRON_NAME = 'Cron to rank up the hashtags';

SyncedCron.config({
  collectionName: 'crons',
});

SyncedCron.add({
  name: 'Remove rank up history',
  schedule(parser) {
    return parser.text('every 1 hour');
  },
  job() {
    SyncedCron._collection.remove({ name: RANK_UP_HASHTAG_CRON_NAME });
  },
});

SyncedCron.add({
  name: RANK_UP_HASHTAG_CRON_NAME,
  schedule(parser) {
    return parser.text('every 5 seconds');
  },
  job() {
    const date = new Date();
    date.setHours(date.getHours() - 1);

    const messages = Messages.find({ thread: null, createdAt: { $gte: date } }).fetch();

    const tagsCounted = _.chain(messages)
      .pluck('tags')
      .flatten()
      .countBy()
      .map((count, tag) => ({ count, tag }))
      .sortBy('count')
      .reverse()
      .slice(0, 10)
      .value();

    if (tagsCounted.length !== 0) {
      TrendingTags.remove({ tag: { $in: _.map(tagsCounted, tagsCounted => tagsCounted.tag) } });
      TrendingTags.update({}, { $inc: { rank: tagsCounted.length } }, { multi: true });
    }

    tagsCounted.forEach((tagCounted, index) => {
      TrendingTags.insert({ rank: index, tag: tagCounted.tag });
    });

    return tagsCounted;
  },
});
