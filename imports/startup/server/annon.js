import { Accounts } from 'meteor/accounts-base';

Accounts.registerLoginHandler((loginRequest) => {
  if (!loginRequest.annon) {
    return undefined;
  }

  const annonId = loginRequest.annonId;

  if (!annonId) {
    return null;
  }

  let userId;

  const annon = Meteor.users.findOne({ annonId });
  if (!annon) {
    userId = Meteor.users.insert({ annonId });
  } else {
    userId = annon._id;
  }

  return {
    userId,
  };
});
