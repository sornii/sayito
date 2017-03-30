import {_} from "meteor/underscore";

const commonFilter = {limit: 10, sort: {createdAt: -1}};

export class MessagesFilter {

    constructor() {
        throw new Error('Use the static methods');
    }

    static common(options) {
        return _.extend({}, commonFilter, options);
    }
}
