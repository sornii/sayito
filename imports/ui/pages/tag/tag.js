import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";

import {_} from "meteor/underscore";
import {$} from "meteor/jquery";

import "../../components/messageInput/messageInput";
import "../../components/messageList/messageList";
import "../../components/loading/loading";
import "../../components/dummy/dummy";

import "./tag.html";

Template.tag.onRendered(function tagOnRendered() {

});

Template.tag.onCreated(function tagOnCreated() {
});

Template.tag.helpers({
    subscriptionNameParams() {
        return {
            name: 'messagesByTag',
            params: {
                tag: function () {
                    return FlowRouter.getParam('tag')
                }
            },
        };
    }
});
