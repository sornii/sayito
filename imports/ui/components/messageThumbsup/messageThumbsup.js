import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {removeThumbsup, thumbsup} from "../../../api/messages/methods.js";
import {Thumbsup} from "../../../api/thumbsup/thumbsup.js";
import "./messageThumbsup.html";

function hasThumbsup(id) {
    return Thumbsup.findOne({_id: id}) != null;
}

Template.messageThumbsup.helpers({
    thumbsupClass () {

        const id = this._id;

        if (hasThumbsup(id)) {
            return '';
        }
        return 'outline';
    }
});

Template.messageThumbsup.events({
    'click .thumbs.up' (event) {
        event.preventDefault();

        const id = this._id;

        if (hasThumbsup(id)) {
            Thumbsup.remove({_id: id});
            removeThumbsup.call({id});
        } else {
            Thumbsup.insert(this);
            thumbsup.call({id});
        }
    }
});