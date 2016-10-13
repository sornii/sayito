import "../messageText/messageText.js";
import "../messageThumbsup/messageThumbsup.js";
import "./messageItem.html";
import {Template} from "meteor/templating";
import {Tracker} from "meteor/tracker";
import {moment} from "meteor/momentjs:moment";

const timeDep = new Tracker.Dependency;

setTimeout(() => {
    timeDep.changed();
}, 1000);

Template.messageItem.helpers({
    howLong () {
        timeDep.depend();
        return moment(this.message.createdAt).fromNow();
    }
});