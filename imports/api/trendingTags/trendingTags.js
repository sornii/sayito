import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const TrendingTags = new Mongo.Collection('TrendingTags');

TrendingTags.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

export const TrendingTagsSchema = new SimpleSchema({
    rank: {
        type: Number
    },
    tag: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});

TrendingTags.attachSchema(TrendingTagsSchema);