import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";

import {_} from "meteor/underscore";
import {$} from "meteor/jquery";

import "../../components/messageInput/messageInput";
import "../../components/messageList/messageList";
import "../../components/loading/loading";
import "../../components/dummy/dummy";

import "./home.html";

Template.home.onRendered(function homeOnRendered() {
});

Template.home.onCreated(function homeOnCreated() {
});

Template.home.helpers({});

