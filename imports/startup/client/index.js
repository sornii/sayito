import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';

import './routes.js';

Meteor.startup(function () {
    TAPi18n.setLanguage((function () {
        return window.navigator.userLanguage ||
            window.navigator.language ||
            window.navigator.systemLanguage;
    })());
});