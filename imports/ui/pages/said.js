import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {_} from "meteor/underscore";
import {$} from "meteor/jquery";
import {Messages} from "../../api/messages/messages.js";
import "../components/sayitoHeader.html";
import "../components/messageText.js";
import "./said.html";

Template.said.helpers({
    messages() {
        return Messages.find({}, {sort: {createdAt: -1}});
    }
});

Template.said.onCreated(function saidOnCreated() {
    this.autorun(() => {
        this.subscribe('messagesByIds', [FlowRouter.getParam('id')]);
    });
});