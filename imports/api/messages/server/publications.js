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
                    throw new Meteor.Error('invalid_information', 'The thread was not found. Invalid information');
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

Meteor.publishComposite('messagesByTag', function ({limit, tag, name, password}) {
    return {
        find() {
            const hashtag = '#' + tag;
            const tagDocument = Tags.findOne({text: hashtag});

            let threadFound = null;

            if (name || password) {
                if (name && password) {
                    threadFound = Threads.findOne({password, name});
                }
                if (!threadFound) {
                    throw new Meteor.Error('invalid_information', 'The thread was not found. Invalid information');
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

Meteor.publishComposite('messagesByIds', function ({hashs, thread, password}) {
    return {
        find() {
            let threadFound = null;

            if (thread || password) {
                if (thread && password) {
                    threadFound = Threads.findOne({password, name: thread});
                }
                if (!threadFound) {
                    throw new Meteor.Error('invalid_information', 'The thread was not found. Invalid information');
                }
            }

            const predicate = {hash: {$in: hashs}, thread: null};

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