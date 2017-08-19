import {Meteor} from "meteor/meteor";
import {Messages} from "../messages";
import {Threads} from "../../threads/threads";
import {Tags} from "../../tags/tags";

import {MessagesFilter} from "../filters";

Meteor.publishComposite('messages', function ({limit, name, password}) {
    return {
        find() {

            let threadFound = null;

            if (name || password) {
                if (name && password) {
                    threadFound = Threads.findOne({password, name});
                }
                if (!threadFound) {
                    throw new Meteor.Error('invalid.password', 'Invalid thread or password');
                }
            }

            const predicate = {thread: null};

            if (threadFound) {
                predicate.thread = threadFound._id;
            }

            return Messages.find(predicate, MessagesFilter.common({limit}));
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

Meteor.publishComposite('messagesByTag', function ({limit, tag, thread, password}) {
    return {
        find() {
            const hashtag = '#' + tag;
            const tagDocument = Tags.findOne({text: hashtag});

            let threadFound = null;

            if (thread || password) {
                if (thread && password) {
                    threadFound = Threads.findOne({password, name: thread});
                }
                if (!threadFound) {
                    throw new Meteor.Error('invalid.password', 'Invalid thread or password');
                }
            }

            let tagToBeUsed;

            if (tagDocument) {
                tagToBeUsed = tagDocument;
            } else {
                tagToBeUsed = Tags.insert({text: hashtag});
            }

            const predicate = {thread: null, tags: tagToBeUsed._id};
            
            if (threadFound) {
                predicate.thread = threadFound._id;
            }

            return Messages.find(predicate, MessagesFilter.common({limit}));
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

Meteor.publishComposite('messagesByIds', function ({ids, thread, password}) {
    return {
        find() {
            let threadFound = null;

            if (thread || password) {
                if (thread && password) {
                    threadFound = Threads.findOne({password, name: thread});
                }
                if (!threadFound) {
                    throw new Meteor.Error('invalid.password', 'Invalid thread or password');
                }
            }

            const predicate = {_id: {$in: ids}, thread: null};

            if (threadFound) {
                predicate.thread = threadFound._id;
            }

            return Messages.find(predicate, MessagesFilter.common());
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