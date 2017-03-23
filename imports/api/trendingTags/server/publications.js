import {Meteor} from "meteor/meteor";
import {TrendingTags} from "../trendingTags.js";
import {_} from "meteor/underscore";

import {commonFilter} from "../filters";

Meteor.publish('rank', function () {
    return TrendingTags.find({}, commonFilter);
});