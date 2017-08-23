import { Meteor } from 'meteor/meteor';
import { TrendingTags } from '../trendingTags';
import { Tags } from '../../tags/tags';
import { findChecked as findThreadChecked } from '../../threads/methods';

import TrendingTagsFilter from '../filters';

Meteor.publishComposite('ranking', ({ thread, password }) => ({
  find() {
    const threadFound = findThreadChecked(thread, password);

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
