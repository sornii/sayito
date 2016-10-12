import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

Meteor.loginAsAnnon = function (annonId, callback) {

    const annon = "annon";
    const loginRequest = {annon, annonId};

    Accounts.callLoginMethod({
        methodArguments: [loginRequest],
        userCallback: callback
    });
};