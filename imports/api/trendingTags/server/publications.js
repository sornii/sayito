import { Meteor } from 'meteor/meteor';
import { TrendingTags } from '../trendingTags';
import { Tags } from '../../tags/tags';
import { Threads } from '../../threads/threads';

import { TrendingTagsFilter } from '../filters';

Meteor.publishComposite('ranking', ({ thread, password }) => ({
  find() {
    let threadFound = null;

    if (thread || password) {
      if (thread && password) {
        threadFound = Threads.findOne({ password, name: thread });
      }
      if (!threadFound) {
        throw new Meteor.Error('invalid_information', 'The thread was not found. Invalid information');
      }
    }

    const predicate = { threadId: null };

    if (threadFound) {
      predicate.threadId = threadFound._id;
    }

    return TrendingTags.find(predicate, TrendingTagsFilter.common());
  },
  children: [
    {
      find(trendingTag) {
        return Tags.find({ _id: trendingTag.tag });
      },
    },
  ],
}));
