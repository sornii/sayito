import _ from 'underscore';

const commonFilter = {
  limit: 10, sort: { rank: 1 },
};

export class TrendingTagsFilter {
  constructor() {
    throw new Error('Use the static methods');
  }

  static common(options) {
    return _.extend({}, commonFilter, options);
  }
}
