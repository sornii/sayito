import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {_} from "meteor/underscore";
import {$} from "meteor/jquery";
import "../../components/messageInput/messageInput.js";
import "../../components/messageList/messageList.js";
import "../../components/loading/loading.js";
import "../../components/dummy/dummy.js";
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
                get tag () {
                    return FlowRouter.getParam('tag');
                }
            },
        };
    }
});
