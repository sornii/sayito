import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";

import {Messages} from "../../../api/messages/messages.js";

import "../../components/messageList/messageList.js";
import "../../components/loading/loading.js";

import "./said.html";

Template.said.onCreated(function saidOnCreated() {
    this.autorun(() => {
        const hashs = [FlowRouter.getParam('hash')];
        this.subscribe('messagesByIds', {hashs});
    });
});

Template.said.helpers({
    messageSaid () {
        return Messages.findOne({hash: FlowRouter.getParam('hash')});
    }
});