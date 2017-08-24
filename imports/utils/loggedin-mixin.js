import { Meteor } from 'meteor/meteor';

export const LoggedInMixin = function loggedInMixinConfiguration(methodOptions) {
  const runFunc = methodOptions.run;
  methodOptions.run = function loggedInMixinRun(...args) {
    if (!this.userId) {
      throw new Meteor.Error('not_authorized', 'You are not authorized to access this function');
    }
    return runFunc.call(this, ...args);
  };
  return methodOptions;
};
