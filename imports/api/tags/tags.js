import { Mongo } from 'meteor/mongo';
import { getParam, getPath, isRoutePassword } from '../../utils/route-utils';
import SimpleSchema from 'simpl-schema';

export const Tags = new Mongo.Collection('Tags');

Tags.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const TagSchema = new SimpleSchema({
  text: {
    type: String,
    label: 'Text',
    max: 20,
  },
});

Tags.helpers({
  link(classes) {
    const tag = this.text.substring(1, this.text.length);
    let path;
    if (isRoutePassword()) {
      const thread = getParam('thread');
      path = getPath('thread.tag', { thread, tag });
    } else {
      path = getPath('tag', { tag });
    }
    return `<a class="${classes}" href="${path}">${this.text}</a>`;
  },
});

Tags.attachSchema(TagSchema);
