import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {removeThumbsup, thumbsup} from "../../api/messages/methods.js";
import {Thumbsup} from "../../api/thumbsup/thumbsup.js";
import "./messageThumbsup.html";

Template.messageThumbsup.helpers({
    thumbsupClass () {
        const thumbsupFound = Thumbsup.findOne({_id: this._id});
        if (thumbsupFound) {
            return '';
        }
        return 'outline';
    }
});

Template.messageThumbsup.events({
    'click .thumbs.up' (event) {
        event.preventDefault();

        const id = this._id;

        const thumbsupFound = Thumbsup.findOne({_id: id});
        if (thumbsupFound) {
            Thumbsup.remove({_id: id});
            removeThumbsup.call({id});
        } else {
            Thumbsup.insert(this);
            thumbsup.call({id});
        }
    }
});