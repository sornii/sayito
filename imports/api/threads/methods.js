import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import {Threads} from './threads';

export const insert = new ValidatedMethod({
    name: 'threads.insert',
    validate: new SimpleSchema({
        name: {type: String},
        password: {type: String},
        creator: {type: String},
    }).validator(),
    run({name, password, creator}) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        const createdAt = new Date();
        return Threads.insert({name, password, creator, createdAt});
    }
});