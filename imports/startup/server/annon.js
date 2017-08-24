import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

function findUserId(annonId) {
  let userId;

  const annon = Meteor.users.findOne({ annonId });
  if (!annon) {
    userId = Meteor.users.insert({ annonId });
  } else {
    userId = annon._id;
  }

  return userId;
}

Accounts.registerLoginHandler((loginRequest) => {
  if (!loginRequest.annon) {
    return undefined;
  }

  const annonId = loginRequest.annonId;

  if (!annonId) {
    return null;
  }

  const userId = findUserId(annonId);
  return { userId };
});
