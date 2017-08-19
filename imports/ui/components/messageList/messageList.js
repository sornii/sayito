import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {ReactiveDict} from "meteor/reactive-dict";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {Messages} from "../../../api/messages/messages.js";
import {MessagesFilter} from "../../../api/messages/filters";
import {$} from "meteor/jquery";
import "../../components/dummy/dummy.js";
import "./messageList.html";

Template.messageList.onCreated(function messageListOnCreated() {
    const limit = 5;

    Session.set('limit', limit);

    this.increaseLimit = () =>
        Session.set('limit', Session.get('limit') + limit);
});

Template.messageList.onRendered(function messageListOnRendered() {
    const instance = this;

    $('.ui.feed.sayito.messages')
        .visibility({
            once: false,
            initialCheck: false,
            //observeChanges: true,
            onBottomVisible () {
                instance.increaseLimit();
            }
        });
});

Template.messageList.helpers({
    messages () {
        return Messages.find({}, MessagesFilter.common({limit: Session.get('limit')}));
    }
});

Template.messageList.events({
});