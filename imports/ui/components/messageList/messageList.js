import {Meteor} from 'meteor/meteor';
import {Template} from "meteor/templating";
import {ReactiveDict} from "meteor/reactive-dict";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {ReactiveVar} from "meteor/reactive-var";
import {Messages} from "../../../api/messages/messages.js";
import {MessagesFilter} from "../../../api/messages/filters";
import {Tracker} from 'meteor/tracker'
import {$} from "meteor/jquery";
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

    this.getSubscriptionParams = (params) => {
        return _.extend({}, params, {limit: this.getLimit()});
    };

    Tracker.autorun(() => {
        const {name, params} = this.data.subscriptionNameParams;
        this.subscribe(name, this.getSubscriptionParams(params));
    });
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