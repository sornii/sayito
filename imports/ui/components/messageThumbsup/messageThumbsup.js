import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {removeThumbsup, thumbsup, hasThumbsup} from "../../../api/messages/methods.js";

import "./messageThumbsup.html";

Template.messageThumbsup.helpers({
    thumbsupClass () {

        const id = this.message._id;

        if (hasThumbsup.call({id})) {
            return '';
        }
        return 'outline';
    },

    thumbsupCount () {
        if (this.message.thumbsup) {
            return this.message.thumbsup.length;
        }
        return 0;
    }
});

Template.messageThumbsup.events({
    'click .thumbs.up' (event) {
        event.preventDefault();

        const id = this.message._id;

        if (hasThumbsup.call({id})) {
            removeThumbsup.call({id});
        } else {
            thumbsup.call({id});
        }
    }
});