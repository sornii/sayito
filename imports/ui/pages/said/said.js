import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {_} from "meteor/underscore";
import {$} from "meteor/jquery";
import "../../components/messageList/messageList.js";
import "./said.html";

Template.said.onCreated(function saidOnCreated() {
    this.autorun(() => {
        this.subscribe('messagesByIds', [FlowRouter.getParam('id')]);
    });
});