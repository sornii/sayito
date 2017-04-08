import {Meteor} from "meteor/meteor";
import {Messages} from "../messages";
import {Threads} from "../../threads/threads";
import {Tags} from "../../tags/tags";

import {MessagesFilter} from "../filters";

Meteor.publishComposite('messages', function ({limit}) {
    return {
        find() {
            return Messages.find({thread: null}, MessagesFilter.common({limit}));
        },
        children: [
            {
                find(message) {
                    return Tags.find({_id: {$in: message.tags}});
                }
            }
        ]
    };
});

Meteor.publishComposite('messagesByThread', function ({limit, thread, password}) {
    return {
        find() {
            const threadFound = Threads.findOne({password, name: thread});

            if (!threadFound)
                return null;

            return Messages.find({thread: threadFound._id}, MessagesFilter.common({limit}));
        },
        children: [
            {
                find(message) {
                    return Tags.find({_id: {$in: message.tags}});
                }
            }
        ]
    }
});

Meteor.publishComposite('messagesByTag', function ({limit, tag}) {
    return {
        find() {
            const tagText = '#' + tag;
            const tagFound = Tags.findOne({text: tagText});

            let tagToBeUsed;

            if (tagFound) {
                tagToBeUsed = tagFound;
            } else {
                tagToBeUsed = Tags.insert({text: tagText});
            }

            return Messages.find({thread: null, tags: tagToBeUsed._id}, MessagesFilter.common({limit}));
        },
        children: [
            {
                find(message) {
                    return Tags.find({_id: {$in: message.tags}});
                }
            }
        ]
    };
});

Meteor.publishComposite('messagesByIds', function (ids) {
    return {
        find() {
            return Messages.find({_id: {$in: ids}, thread: null});
        },
        children: [
            {
                find(message) {
                    return Tags.find({_id: {$in: message.tags}});
                }
            }
        ]
    };
});