import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { getParam, getPath, isRoutePassword } from '../../utils/route-utils';
import { Tags } from '../tags/tags';

export const Messages = new Mongo.Collection('Messages');

Messages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const MessageSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    denyUpdate: true,
  },
  bumpAt: {
    type: Date,
  },
  text: {
    type: String,
    max: 140,
  },
  tags: {
    type: Array,
    regEx: SimpleSchema.RegEx.Id,
  },
  'tags.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  thumbsup: {
    type: Array,
    optional: true,
  },
  'thumbsup.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  hash: {
    type: String,
  },
  thread: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
});

Messages.helpers({
  thumbsupCount() {
    if (this.thumbsup) {
      return this.thumbsup.length;
    }
    return 0;
  },
  hashTags() {
    return Tags.find({ _id: { $in: this.tags } });
  },
  formattedText() {
    const hashTags = this.hashTags().fetch();
    let finalText = this.text;
    hashTags.forEach((tag) => {
      finalText = finalText.replace(tag.text, tag.link());
    });
    return finalText;
  },
  link() {
    let path;
    const hash = this.hash;
    if (isRoutePassword()) {
      const thread = getParam('thread');
      path = getPath('thread.said', { thread, hash });
    } else {
      path = getPath('said', { hash });
    }
    return `<a href="${path}">${this.hash}</a>`;
  },
});

Messages.attachSchema(MessageSchema);
