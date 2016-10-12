import {Meteor} from "meteor/meteor";
import {TAPi18n} from "meteor/tap:i18n";
import {Momentum} from "meteor/percolate:momentum";
import {moment} from "meteor/momentjs:moment";
import AnnonUtil from "./annon-util.js";
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

    Momentum.registerPlugin('instaRemoveFadeIn', function (options) {
        return {
            insertElement: function (node, next) {
                const $node = $(node);
                $node.hide()
                    .insertBefore(next)
                    .velocity('fadeIn');
            },
            moveElement: function (node, next) {
                this.removeElement(node);
                this.insertElement(node, next);
            },
            removeElement: function (node) {
                const $node = $(node);
                $node.remove();
            }
        };
    });
});