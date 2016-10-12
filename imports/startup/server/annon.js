import { Accounts } from 'meteor/accounts-base';

Accounts.registerLoginHandler(function (loginRequest) {
    if(!loginRequest.annon) {
        return undefined;
    }

    const annonId = loginRequest.annonId;

    if (!annonId) {
        return null;
    }

    let userId;

    const annon = Meteor.users.findOne({annonId: annonId});
    if (!annon) {
        userId = Meteor.users.insert({annonId: annonId});
    } else {
        userId = annon._id;
    }

    return {
        userId
    };
});