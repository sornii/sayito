import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {_} from "meteor/underscore";
import {$} from "meteor/jquery";
import "../../components/messageInput/messageInput.js";
import "../../components/messageList/messageList.js";
import "../../components/loading/loading.js";
import "../../components/dummy/dummy.js";
import "./home.html";

Template.home.onRendered(function homeOnRendered() {

});

Template.home.onCreated(function homeOnCreated() {

});

Template.home.helpers({
    subscriptionNameParams() {
        return {
            name: 'messages',
            params: { }
        };
    },

    subscriptionMethod () {

        const instance = Template.instance();

        return {
            subscribe: (params) => instance.subscribe('messages', params)
        };
    }
});

