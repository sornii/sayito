import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {_} from "meteor/underscore";
import {$} from "meteor/jquery";
import {Messages} from "../../api/messages/messages.js";
import {Thumbsup} from "../../api/thumbsup/thumbsup.js";
import {insert} from "../../api/messages/methods.js";
import "../components/sayitoHeader.html";
import "./home.html";

Template.home.onCreated(function homeOnCreated() {

    this.autorun(() => {

        const tagRoute = ActiveRoute.name('tag');
        const thumbsupRoute = ActiveRoute.name('thumbsup');

        if(tagRoute) {
            this.subscribe('messagesByTag', FlowRouter.getParam('tag'));
        } else if (thumbsupRoute) {
            const ids = _.map(Thumbsup.find({}).fetch(), function (o) {
                return o._id;
            });
            this.subscribe('messagesThumbsup', ids);
        } else {
            this.subscribe('messages');
        }
    });

});

Template.home.helpers({

    messages () {
        return Messages.find({}, {sort: {createdAt: -1}});
    }

});

Template.home.events({

    'submit .sayito.form' (event) {
        event.preventDefault();

        const $sayitoForm = $(".sayito-input");
        const text = $sayitoForm.val();
        $sayitoForm.val("");

        try {
            insert.call({text});
            $('#sayito-input-label')
                .transition('hide fade');
        } catch (err) {
            $('#sayito-input-label')
                .text(err.reason);
            $('#sayito-input-label')
                .transition('show fade');
        }
    }

});