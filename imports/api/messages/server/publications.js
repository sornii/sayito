import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages';
import { findChecked as findThreadChecked } from '../../threads/methods';
import { Tags } from '../../tags/tags';

import MessagesFilter from '../filters';

Meteor.publishComposite('messages', ({ limit, name, password }) => ({
  find() {
    const threadFound = findThreadChecked(name, password);

    const predicate = { thread: null };

    if (threadFound) {
      predicate.thread = threadFound._id;
    }

    return Messages.find(predicate, MessagesFilter.common({ limit }));
  },
  children: [
    {
      find(message) {
        return Tags.find({ _id: { $in: message.tags } });
      },
    },
  ],
}));

Meteor.publishComposite('messagesByTag', ({ limit, tag, name, password }) => ({
  find() {
    const hashtag = `#${tag}`;
    const tagDocument = Tags.findOne({ text: hashtag });

    const threadFound = findThreadChecked(name, password);

    let tagToBeUsed;

    if (tagDocument) {
      tagToBeUsed = tagDocument;
    } else {
      tagToBeUsed = Tags.insert({ text: hashtag });
    }

    const predicate = { thread: null, tags: tagToBeUsed._id };

    if (threadFound) {
      predicate.thread = threadFound._id;
    }

    return Messages.find(predicate, MessagesFilter.common({ limit }));
  },
  children: [
    {
      find(message) {
        return Tags.find({ _id: { $in: message.tags } });
      },
    },
  ],
}));

Meteor.publishComposite('messagesByIds', ({ hashs, thread, password }) => ({
  find() {
    const threadFound = findThreadChecked(thread, password);

    const predicate = { hash: { $in: hashs }, thread: null };

    if (threadFound) {
      predicate.thread = threadFound._id;
    }

    return Messages.find(predicate, MessagesFilter.common());
  },
  children: [
    {
      find(message) {
        return Tags.find({ _id: { $in: message.tags } });
      },
    },
  ],
}));
