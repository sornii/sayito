import {Meteor} from 'meteor/meteor';
import {Template} from "meteor/templating";
import {ReactiveDict} from "meteor/reactive-dict";
import {ReactiveVar} from "meteor/reactive-var";
import {Messages} from "../../../api/messages/messages.js";
import {MessagesFilter} from "../../../api/messages/filters";
import { Tracker } from 'meteor/tracker'
import "../../components/dummy/dummy.js";
import "./messageList.html";

Template.messageList.onCreated(function messageListOnCreated() {
    const limit = 'limit';
    const limitStep = 5;

    this.state = new ReactiveDict();
    this.state.setDefault({
        [limit]: limitStep
    });

    this.getLimit = () =>
        this.state.get(limit);

    this.increaseLimit = () =>
        this.state.set(limit, this.getLimit() + limitStep);

    Tracker.autorun(() => {
        const limitValue = this.getLimit();
        this.subscribe('messages', limitValue);
    });
});

Template.messageList.onRendered(function messageListOnRendered() {

    const instance = this;

    $('.ui.feed.sayito.messages')
        .visibility({
            once: false,
            initialCheck: false,
            onBottomVisible () {
                instance.increaseLimit();
            }
        });
});

Template.messageList.helpers({

    messages () {
        const instance = Template.instance();
        return Messages.find({}, MessagesFilter.common({limit: instance.getLimit()}));
    }

});

Template.messageList.events({
    'click .ui.button.more' (event, instance) {
        const limit = instance.state.get('limit');
        instance.state.set('limit', limit + 5);
    }
});