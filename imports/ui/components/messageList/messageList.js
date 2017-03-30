import {Template} from "meteor/templating";
import {ReactiveDict} from "meteor/reactive-dict";
import {ReactiveVar} from "meteor/reactive-var";
import {Messages} from "../../../api/messages/messages.js";
import {MessagesFilter} from "../../../api/messages/filters";
import "../../components/dummy/dummy.js";
import "./messageList.html";

Template.messageList.onCreated(function onCreated() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        limit: 5
    });

    this.autorun(() => {
        this.subscribe('messages', this.state.get('limit'));
    });

});

Template.messageList.helpers({

    messages () {
        const instance = Template.instance();
        return Messages.find({}, MessagesFilter.common({limit: instance.state.get('limit')}));
    }

});

Template.messageList.events({
    'click .ui.button.more' (event, instance) {
        const limit = instance.state.get('limit');
        instance.state.set('limit', limit + 5);
    }
});