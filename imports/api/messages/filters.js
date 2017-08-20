import _ from 'underscore';

const commonFilter = { limit: 5, sort: { createdAt: -1 } };

export class MessagesFilter {
  constructor() {
    throw new Error('Use the static methods');
  }

  static common(options) {
    return _.extend({}, commonFilter, options);
  }
}
