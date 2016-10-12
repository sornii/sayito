import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {_} from "meteor/underscore";
import {$} from "meteor/jquery";
import {insert} from "../../../api/messages/methods.js";
import "../../components/messageList/messageList.js";
import "../../components/loading/loading.js";
import "./home.html";

Template.home.onCreated(function homeOnCreated() {
    this.autorun(() => {

        const tagRoute = ActiveRoute.name('tag');
        const thumbsupRoute = ActiveRoute.name('thumbsup');

        if (tagRoute) {
            this.subscribe('messagesByTag', FlowRouter.getParam('tag'));
        } else if (thumbsupRoute) {
            const ids = [];
            this.subscribe('messagesByIds', ids);
        } else {
            this.subscribe('messages');
        }
    });

});

Template.home.events({

    'submit .sayito.form' (event) {
        event.preventDefault();

        const $sayitoForm = $(".sayito-input");
        const text = $sayitoForm.val();
        $sayitoForm.val("");

        var $sayitoInputLabel = $('#sayito-input-label');
        try {
            insert.call({text});
            $sayitoInputLabel.transition('hide fade');
        } catch (err) {
            $sayitoInputLabel.text(err.reason);
            $sayitoInputLabel.transition('show fade');
        }
    }

});