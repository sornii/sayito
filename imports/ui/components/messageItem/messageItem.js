import "../messageText/messageText.js";
import "../messageThumbsup/messageThumbsup.js";
import "./messageItem.html";
import {Template} from "meteor/templating";
import {moment} from "meteor/momentjs:moment";

Template.messageItem.helpers({
    howLong () {
        return moment(this.message.createdAt).fromNow();
    }
});