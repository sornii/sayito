import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Tags } from '../tags/tags.js';

export const TrendingTags = new Mongo.Collection('TrendingTags');

TrendingTags.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const TrendingTagsSchema = new SimpleSchema({
  rank: {
    type: Number,
  },
  tag: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  threadId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
});

TrendingTags.helpers({
  hashTag() {
    return Tags.findOne({ _id: this.tag });
  },
});

TrendingTags.attachSchema(TrendingTagsSchema);
