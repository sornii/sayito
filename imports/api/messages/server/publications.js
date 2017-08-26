import { Meteor } from 'meteor/meteor';

import { Messages } from '../messages';
import { findChecked as findThreadChecked } from '../../threads/methods';
import { Tags } from '../../tags/tags';

import MessagesFilter from '../filters';

const defaultPredicate = (threadFound) => {
  const predicate = { thread: null };
  if (threadFound) {
    predicate.thread = threadFound._id;
  }
  return predicate;
};

const tagsChild = {
  find(message) {
    return Tags.find({ _id: { $in: message.tags } });
  },
};

Meteor.publishComposite('messages', ({ limit, thread, password }) => ({
  find() {
    const threadFound = findThreadChecked(thread, password);
    const predicate = defaultPredicate(threadFound);

    return Messages.find(predicate, MessagesFilter.common({ limit }));
  },
  children: [
    tagsChild,
  ],
}));

Meteor.publishComposite('messagesByTag', ({ limit, tag, thread, password }) => ({
  find() {
    const hashtag = `#${tag}`;
    const tagDocument = Tags.findOne({ text: hashtag });

    const threadFound = findThreadChecked(thread, password);

    let tagToBeUsed;

    if (tagDocument) {
      tagToBeUsed = tagDocument;
    } else {
      tagToBeUsed = Tags.insert({ text: hashtag });
    }

    const predicate = { ...defaultPredicate(threadFound), tags: tagToBeUsed._id };
    return Messages.find(predicate, MessagesFilter.common({ limit }));
  },
  children: [
    tagsChild,
  ],
}));

Meteor.publishComposite('messagesByIds', ({ hashs, thread, password }) => ({
  find() {
    const threadFound = findThreadChecked(thread, password);
    const predicate = { ...defaultPredicate(threadFound), hash: { $in: hashs } };
    return Messages.find(predicate, MessagesFilter.common());
  },
  children: [
    tagsChild,
  ],
}));
