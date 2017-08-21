import { check, Match } from 'meteor/check';

export const LoggedInMixin = function loggedInMixinConfiguration(methodOptions) {
  check(methodOptions.checkLoggedInError, Match.ObjectIncluding({
    error: String,
    message: Match.Optional(String),
    reason: Match.Optional(String),
  }));
  const runFunc = methodOptions.run;
  methodOptions.run = function loggedInMixinRun() {
    if (!this.userId) {
      throw new Meteor.Error(..._.values(methodOptions.checkLoggedInError));
    }
    return runFunc.call(this, ...arguments);
  };
  return methodOptions;
};
