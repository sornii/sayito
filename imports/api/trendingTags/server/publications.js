import {Meteor} from "meteor/meteor";
import {TrendingTags} from "../trendingTags.js";
import {Tags} from "../../tags/tags.js";
import {_} from "meteor/underscore";

import {TrendingTagsFilter} from "../filters";

Meteor.publishComposite('ranking', function () {
    return {
        find() {
            return TrendingTags.find({}, TrendingTagsFilter.common());
        },
        children: [
            {
                find(trendingTag) {
                    return Tags.find({_id: trendingTag.tag});
                }
            }
        ]
    };
});