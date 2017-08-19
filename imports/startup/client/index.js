import {Meteor} from "meteor/meteor";
import {Session} from 'meteor/session'
import {TAPi18n} from "meteor/tap:i18n";
import {Momentum} from "meteor/percolate:momentum";
import {moment} from "meteor/momentjs:moment";

import AnnonUtil from "./annon-util.js";
import ThreadPasswords from '../../utils/thread-passwords';

import "./routes.js";
import "./annon.js";

Meteor.startup(function () {

    const annonId = AnnonUtil.annonId();

    Meteor.loginAsAnnon(annonId);

    const locale = window.navigator.userLanguage ||
        window.navigator.language ||
        window.navigator.systemLanguage;

    TAPi18n.setLanguage(locale);
    moment.locale(locale);

    Session.set('passwords', ThreadPasswords.retrieveAllPasswords());
});