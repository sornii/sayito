import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";

import {_} from "meteor/underscore";
import {$} from "meteor/jquery";

import {Messages} from "../../../api/messages/messages.js";

import "../../components/messageList/messageList.js";
import "../../components/loading/loading.js";

import "./said.html";

Template.said.onCreated(function saidOnCreated() {
    this.autorun(() => {
        this.subscribe('messagesByIds', [FlowRouter.getParam('id')]);
    });
});

Template.said.helpers({
    messageSaid () {
        return Messages.findOne({_id: FlowRouter.getParam('id')});
    }
});